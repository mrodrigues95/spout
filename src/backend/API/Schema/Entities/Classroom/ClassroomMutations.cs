using API.Data;
using Entity = API.Data.Entities;
using API.Extensions;
using HotChocolate;
using HotChocolate.Types;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System;
using CSharpVitamins;
using HotChocolate.AspNetCore.Authorization;
using System.Linq;
using System.Collections.Generic;

namespace API.Schema.Entities.Classroom {
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class ClassroomMutations {
        [Authorize]
        [UseApplicationDbContext]
        public async Task<CreateClassroomPayload> CreateClassroomAsync(
            CreateClassroomInput input,
            [ScopedService] ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            // TODO: Fix this - it should also insert into UserClassroom.
            var classroom = new Entity.Classroom {
                Name = input.Name,
            };

            ctx.Classrooms.Add(classroom);
            await ctx.SaveChangesAsync(cancellationToken);

            return new CreateClassroomPayload(classroom);
        }

        [Authorize]
        [UseApplicationDbContext]
        public async Task<CreateClassroomInvitePayload> CreateClassroomInviteAsync(
            CreateClassroomInviteInput input,
            [GlobalState] int userId,
            [ScopedService] ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            if (input.Code != null) {
                var classroomInvite = await ctx.ClassroomInvites
                    .Include(x => x.Invite)
                    .SingleOrDefaultAsync(x =>
                    x.Invite!.Code == input.Code &&
                    x.ClassroomId == input.ClassroomId &&
                    x.UserId == userId &&
                    x.IsInviter, cancellationToken);

                if (IsValid(classroomInvite)) return new CreateClassroomInvitePayload(classroomInvite.Invite!);
            } else if (input.ExpiresAt is null && input.MaxUses is null) {
                // Check if the user already has an existing invite created before creating a new one.
                var classroomInvites = await ctx.ClassroomInvites
                    .Where(x =>
                        x.ClassroomId == input.ClassroomId &&
                        x.UserId == userId &&
                        x.IsInviter)
                    .Include(x => x.Invite)
                    .ToListAsync(cancellationToken);

                var classroomInvite = ValidateClassroomInvites(classroomInvites);
                if (classroomInvite != null) return new CreateClassroomInvitePayload(classroomInvite.Invite!);
            }

            var invite = new Entity.Invite {
                Code = new ShortGuid(Guid.NewGuid()),
                Uses = 0,
                MaxUses = input.MaxUses,
                ExpiresAt = input.ExpiresAt
            };
            invite.Logs.Add(new Entity.ClassroomInvite {
                InviteId = invite.Id,
                UserId = userId,
                ClassroomId = input.ClassroomId,
                IsInviter = true,
                IsInvitee = false
            });

            ctx.Invites.Add(invite);
            await ctx.SaveChangesAsync(cancellationToken);

            return new CreateClassroomInvitePayload(invite);
        }

        /// <summary>
        /// Validates a collection of classroom invites that belong to a specific user.
        /// If a valid classroom invite is found, it will be returned.
        /// </summary>
        private Entity.ClassroomInvite? ValidateClassroomInvites(List<Entity.ClassroomInvite> classroomInvites) {
            foreach (var classroomInvite in classroomInvites) {
                if (IsValid(classroomInvite)) return classroomInvite;
            }

            return null;
        }

        private bool IsValid(Entity.ClassroomInvite? classroomInvite) {
            var invite = classroomInvite?.Invite;

            if (invite is null) return false;
            if (invite.MaxUses != null && invite.MaxUses <= invite.Uses) return false;
            if (invite.ExpiresAt != null && invite.ExpiresAt <= DateTime.UtcNow) return false;

            return true;
        }
    }
}
