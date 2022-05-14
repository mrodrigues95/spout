using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using API.Attributes;
using API.Data;
using API.Data.Entities;
using API.Schema.Mutations.Classrooms.Exceptions;
using API.Schema.Mutations.Classrooms.Inputs;
using CSharpVitamins;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Enums = API.Common.Enums;

namespace API.Schema.Mutations.Classrooms {
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class ClassroomMutations {
        private readonly ILogger<ClassroomMutations> _logger;

        public ClassroomMutations(ILogger<ClassroomMutations> logger) {
            _logger = logger;
        }

        [Authorize]
        public async Task<Classroom> CreateClassroomAsync(
            [GlobalUserId] int userId,
            CreateClassroomInput input,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var classroom = new Classroom {
                Name = input.Name.Trim(),
                StateId = (int)Enums.State.Active
            };

            classroom.Users.Add(new ClassroomUser {
                Classroom = classroom,
                UserId = userId,
                IsCreator = true,
                JoinedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            });

            ctx.Classrooms.Add(classroom);
            await ctx.SaveChangesAsync(cancellationToken);

            return classroom;
        }

        [Authorize]
        [Error(typeof(ClassroomNotFoundException))]
        [Error(typeof(ClassroomInviteExpiredException))]
        public async Task<Classroom?> JoinClassroomAsync(
            [GlobalUserId] int userId,
            JoinClassroomInput input,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var invite = await ctx.ClassroomInvites
                .SingleOrDefaultAsync(ci => ci.Code == input.Code && (
                        ci.MaxUses != null && ci.TotalUses < ci.MaxUses ||
                        ci.ExpiresAt != null && DateTime.UtcNow < ci.ExpiresAt ||
                        ci.MaxUses == null && ci.ExpiresAt == null),
                        cancellationToken);
            if (invite is null) throw new ClassroomInviteExpiredException();

            var classroom = await ctx.Classrooms
                .Include(c => c.Users)
                .SingleOrDefaultAsync(c => c.Id == invite.ClassroomId, cancellationToken);
            if (classroom is null) throw new ClassroomNotFoundException();

            var isAlreadyInClassroom = classroom.Users.Any(x => x.UserId == userId);
            if (isAlreadyInClassroom) {
                // Return the classroom instead of throwing an error so that the front-end
                // can redirect to the classroom.
                return classroom;
            }

            invite.TotalUses++;
            invite.UpdatedAt = DateTime.UtcNow;
            invite.Logs.Add(new ClassroomInviteLog {
                UsedById = userId,
                UsedAt = DateTime.UtcNow,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            });

            classroom.Users.Add(new ClassroomUser {
                ClassroomId = classroom.Id,
                UserId = userId,
                IsCreator = false,
                JoinedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            });

            await ctx.SaveChangesAsync(cancellationToken);

            return classroom;
        }

        [Authorize]
        [Error(typeof(ClassroomNotFoundException))]
        public async Task<ClassroomInvite> CreateClassroomInviteAsync(
            [GlobalUserId] int userId,
            CreateClassroomInviteInput input,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var classroom = await ctx.Classrooms.FindAsync(
                new object[] { input.ClassroomId },
                cancellationToken);
            if (classroom is null) throw new ClassroomNotFoundException();

            // If options are not specified, then by default expire after 7 days.
            int? maxAge = 604800;
            DateTime? expiresAt = DateTime.UtcNow.AddDays(7);

            if (input.MaxAge is not null && input.MaxAge > 0) {
                maxAge = input.MaxAge;
                expiresAt = DateTime.UtcNow.AddSeconds((double)input.MaxAge);
            } else if (input.MaxAge == 0) {
                maxAge = null;
                expiresAt = null;
            }

            var invite = new ClassroomInvite {
                CreatedById = userId,
                ClassroomId = classroom.Id,
                Code = new ShortGuid(Guid.NewGuid()),
                TotalUses = 0,
                MaxUses = input.MaxUses,
                MaxAge = maxAge,
                ExpiresAt = expiresAt
            };

            ctx.ClassroomInvites.Add(invite);
            await ctx.SaveChangesAsync(cancellationToken);

            return invite;
        }
    }
}
