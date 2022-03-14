using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using API.Data;
using API.Data.Entities;
using API.Schema.Mutations.Classrooms.Exceptions;
using API.Schema.Mutations.Classrooms.Inputs;
using CSharpVitamins;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Enums = API.Common.Enums;

namespace API.Schema.Mutations.Classrooms {
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class ClassroomMutations {
        [Authorize]
        public async Task<Classroom> CreateClassroomAsync(
            [GlobalState] int userId,
            CreateClassroomInput input,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var classroom = new Classroom {
                Name = input.Name,
                StateId = (int)Enums.State.Active
            };

            classroom.Users.Add(new ClassroomUser {
                Classroom = classroom,
                UserId = userId,
                IsCreator = true
            });

            ctx.Classrooms.Add(classroom);
            await ctx.SaveChangesAsync(cancellationToken);

            return classroom;
        }

        [Authorize]
        [Error(typeof(ClassroomInviteExpiredException))]
        [Error(typeof(UserAlreadyInClassroomException))]
        public async Task<Classroom?> JoinClassroomAsync(
            [GlobalState] int userId,
            JoinClassroomInput input,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var classroomInvite = await ctx.ClassroomInvites
                .Include(x => x.Invite)
                .Include(x => x.Classroom)
                    .ThenInclude(x => x!.Users)
                .SingleOrDefaultAsync(x =>
                    x.Invite!.Code == input.Code
                    && x.IsInviter, cancellationToken);

            if (!IsValid(classroomInvite?.Invite)) {
                throw new ClassroomInviteExpiredException();
            }

            var invite = classroomInvite!.Invite!;
            var classroom = classroomInvite!.Classroom!;

            var isAlreadyInClassroom = classroom.Users.Any(x => x.UserId == userId);
            if (isAlreadyInClassroom) {
                throw new UserAlreadyInClassroomException(classroom.Name!);
            }

            invite.Uses++;
            invite.UpdatedAt = DateTime.UtcNow;
            invite.Logs.Add(new ClassroomInvite {
                InviteId = invite.Id,
                UserId = userId,
                ClassroomId = classroomInvite.ClassroomId,
                IsInviter = false,
                IsInvitee = true,
                UsedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            });

            classroom.Users.Add(new ClassroomUser {
                ClassroomId = classroom.Id,
                UserId = userId,
                IsCreator = false
            });

            await ctx.SaveChangesAsync(cancellationToken);

            return classroom;
        }

        [Authorize]
        public async Task<Invite> CreateClassroomInviteAsync(
            [GlobalState] int userId,
            CreateClassroomInviteInput input,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            if (input.Code != null) {
                var classroomInvite = await ctx.ClassroomInvites
                    .Include(x => x.Invite)
                    .SingleOrDefaultAsync(x =>
                        x.Invite!.Code == input.Code
                        && x.ClassroomId == input.ClassroomId
                        && x.UserId == userId
                        && x.IsInviter, cancellationToken);

                if (IsValid(classroomInvite?.Invite))
                    return classroomInvite!.Invite!;
            } else if (input.MaxAge is null && input.MaxUses is null) {
                // Check if the user already has an existing invite created before creating a new one.
                var classroomInvites = await ctx.ClassroomInvites
                    .Where(x =>
                        x.ClassroomId == input.ClassroomId
                        && x.UserId == userId
                        && x.IsInviter)
                    .Include(x => x.Invite)
                    .ToListAsync(cancellationToken);

                var classroomInvite = ValidateClassroomInvites(classroomInvites);
                if (classroomInvite != null)
                    return classroomInvite!.Invite!;
            }

            // Set defaults (7 days).
            int? maxAge = 604800;
            DateTime? expiresAt = DateTime.UtcNow.AddDays(7);

            if (input.MaxAge != null && input.MaxAge > 0) {
                maxAge = input.MaxAge;
                expiresAt = DateTime.UtcNow.AddSeconds((double)input.MaxAge);
            } else if (input.MaxAge == 0) {
                maxAge = null;
                expiresAt = null;
            }

            var invite = new Invite {
                Code = new ShortGuid(Guid.NewGuid()),
                Uses = 0,
                MaxUses = input.MaxUses,
                MaxAge = maxAge,
                ExpiresAt = expiresAt
            };
            invite.Logs.Add(new ClassroomInvite {
                InviteId = invite.Id,
                UserId = userId,
                ClassroomId = input.ClassroomId,
                IsInviter = true,
                IsInvitee = false
            });

            ctx.Invites.Add(invite);
            await ctx.SaveChangesAsync(cancellationToken);

            return invite;
        }

        /// <summary>
        /// Validates a collection of classroom invites that belong to a specific user.
        /// If a valid classroom invite is found, it will be returned.
        /// </summary>
        private ClassroomInvite? ValidateClassroomInvites(List<ClassroomInvite> classroomInvites) {
            foreach (var classroomInvite in classroomInvites) {
                if (IsValid(classroomInvite.Invite!))
                    return classroomInvite;
            }

            return null;
        }

        private bool IsValid(Invite? invite) {
            if (invite is null)
                return false;
            if (invite.MaxUses != null && invite.MaxUses <= invite.Uses)
                return false;
            if (invite.ExpiresAt != null && invite.ExpiresAt <= DateTime.UtcNow)
                return false;

            return true;
        }
    }
}
