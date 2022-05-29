using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.Extensions.Logging;

namespace API.Security.Policy {
    public class ClassroomAuthorizationHandler
        : AuthorizationHandler<ClassroomOperationRequirement, Classroom> {
        private readonly ILogger<ClassroomAuthorizationHandler> _logger;

        private enum ClassroomPermission { Teacher, Student }
        private readonly Dictionary<ClassroomOperationRequirement,
            Func<List<ClassroomPermission>, bool>> ValidateClassroomPermissions
            = new Dictionary<ClassroomOperationRequirement, Func<List<ClassroomPermission>, bool>>
            {
                {
                    ClassroomOperations.Create, x => x.Contains(ClassroomPermission.Teacher)
                },
                {
                    ClassroomOperations.Read, x => x.Contains(ClassroomPermission.Teacher) ||
                                        x.Contains(ClassroomPermission.Student)
                },
                {
                    ClassroomOperations.Update, x => x.Contains(ClassroomPermission.Teacher)
                },
                {
                    ClassroomOperations.Delete, x => x.Contains(ClassroomPermission.Teacher)
                }
            };

        public ClassroomAuthorizationHandler(ILogger<ClassroomAuthorizationHandler> logger) {
            _logger = logger;
        }

        protected override Task HandleRequirementAsync(
            AuthorizationHandlerContext context,
            ClassroomOperationRequirement requirement,
            Classroom resource) {
            var permissions = new List<ClassroomPermission>();
            var userId = context.User.GetUserIdValue();

            if (resource.Users.Count() == 0) {
                _logger.LogError("No users found for this classroom - " +
                    "a classroom cannot exist without at least one user. " +
                    "Try eager loading the users. {classroom}", resource);
                return Task.FromResult(0);
            }

            var classroomTeacher = resource.Users.SingleOrDefault(x => x.IsCreator);

            if (context.User.HasClaim(ClaimTypes.Role, UserRoles.Admin)) {
                context.Succeed(requirement);
                return Task.FromResult(0);
            }

            if (classroomTeacher?.UserId == userId) {
                permissions.Add(ClassroomPermission.Teacher);
            } else if (resource.Users.Any(x => x.UserId == userId)) {
                permissions.Add(ClassroomPermission.Student);
            }

            if (ValidateClassroomPermissions[requirement](permissions)) {
                context.Succeed(requirement);
            }

            return Task.FromResult(0);
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
