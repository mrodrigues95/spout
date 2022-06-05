using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using API.Data;
using API.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Security.Policy {
    public class ClassroomAuthorizationHandler
        : AuthorizationHandler<ClassroomOperationRequirement, Classroom>, IAsyncDisposable {
        private readonly ILogger<ClassroomAuthorizationHandler> _logger;
        private readonly ApplicationDbContext _ctx;

        private enum ClassroomPermission { Teacher, Student }
        private readonly Dictionary<ClassroomOperationRequirement,
            Func<List<ClassroomPermission>, bool>> ValidateClassroomPermissions
            = new Dictionary<ClassroomOperationRequirement, Func<List<ClassroomPermission>, bool>>
            {
                {
                    ClassroomOperations.Create, x => x.Contains(ClassroomPermission.Teacher)
                },
                {
                    ClassroomOperations.Read, x =>
                                        x.Contains(ClassroomPermission.Teacher) ||
                                        x.Contains(ClassroomPermission.Student)
                },
                {
                    ClassroomOperations.Update, x => x.Contains(ClassroomPermission.Teacher)
                },
                {
                    ClassroomOperations.Delete, x => x.Contains(ClassroomPermission.Teacher)
                }
            };

        public ClassroomAuthorizationHandler(
            ILogger<ClassroomAuthorizationHandler> logger,
            IDbContextFactory<ApplicationDbContext> dbContextFactory) {
            _logger = logger;
            _ctx = dbContextFactory.CreateDbContext();
        }

        public ValueTask DisposeAsync() => _ctx.DisposeAsync();

        protected override async Task HandleRequirementAsync(
            AuthorizationHandlerContext context,
            ClassroomOperationRequirement requirement,
            Classroom resource) {
            var permissions = new List<ClassroomPermission>();
            var userId = context.User.GetUserIdValue();
            var classroomUsers = await _ctx.ClassroomUsers
                .Where(x => x.ClassroomId == resource.Id)
                .Select(x => new { x.IsCreator, x.UserId })
                .ToListAsync(CancellationToken.None);

            if (classroomUsers.Count() == 0) {
                _logger.LogError("Fatal: no users found for this classroom - " +
                    "a classroom cannot exist without at least one user. {classroom}", resource);
                return;
            }

            if (context.User.HasClaim(ClaimTypes.Role, UserRoles.Admin)) {
                context.Succeed(requirement);
                return;
            }

            var classroomTeacher = classroomUsers.SingleOrDefault(x => x.IsCreator);
            if (classroomTeacher?.UserId == userId) {
                permissions.Add(ClassroomPermission.Teacher);
            } else if (classroomUsers.Any(x => x.UserId == userId)) {
                permissions.Add(ClassroomPermission.Student);
            }

            if (ValidateClassroomPermissions[requirement](permissions)) {
                context.Succeed(requirement);
                return;
            }
        }
    }

    public class ClassroomOperationRequirement : OperationAuthorizationRequirement { }

    public static class ClassroomOperations {
        public static ClassroomOperationRequirement Create =
            new ClassroomOperationRequirement { Name = nameof(Create) };
        public static ClassroomOperationRequirement Read =
            new ClassroomOperationRequirement { Name = nameof(Read) };
        public static ClassroomOperationRequirement Update =
            new ClassroomOperationRequirement { Name = nameof(Update) };
        public static ClassroomOperationRequirement Delete =
            new ClassroomOperationRequirement { Name = nameof(Delete) };
    }
}
