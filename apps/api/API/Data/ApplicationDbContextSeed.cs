using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Common.Utilities;
using API.Data.Entities;
using API.Schema.Types.ClassroomTimelineEvents;
using API.Schema.Types.Users;
using API.Security;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Data {
    public class ApplicationDbContextSeed {
        public static async Task SeedDataAsync(
            ApplicationDbContext context,
            UserManager<User> userManager,
            RoleManager<IdentityRole<int>> roleManager,
            ILoggerFactory loggerFactory,
            int retry = 0) {
            try {
                if (!await roleManager.Roles.AnyAsync()) {
                    await GetPreconfiguredUserRolesAsync(roleManager);
                    await context.SaveChangesAsync();
                }

                if (!await userManager.Users.AnyAsync()) {
                    foreach (var user in GetPreconfiguredUsers(context)) {
                        var pwd = "rootdev";
                        await userManager.CreateAsync(user, pwd);
                    }
                    await context.SaveChangesAsync();
                    await GetPreconfiguredAdminUsers(userManager);
                    await context.SaveChangesAsync();
                }

                if (!await context.Classrooms.AnyAsync()) {
                    await context.Classrooms.AddRangeAsync(await GetPreconfiguredClassrooms(context));
                    await context.SaveChangesAsync();
                }

                if (!await context.Discussions.AnyAsync()) {
                    await context.Discussions.AddRangeAsync(await GetPreConfiguredDiscussions(context));
                    await context.SaveChangesAsync();
                }

                if (!await context.Messages.AnyAsync()) {
                    await context.Messages.AddRangeAsync(await GetPreconfiguredDiscussionMessages(context));
                    await context.SaveChangesAsync();
                }

                if (!await context.ClassroomTimelineEvents.AnyAsync()) {
                    await context.ClassroomTimelineEvents.AddRangeAsync(
                        await GetPreconfiguredClassroomTimelineEvents(context));
                    await context.SaveChangesAsync();
                }
            } catch (Exception ex) {
                if (retry < 10) {
                    retry++;
                    var log = loggerFactory.CreateLogger<ApplicationDbContextSeed>();
                    log.LogError(ex.Message);
                    await SeedDataAsync(context, userManager, roleManager, loggerFactory, retry);
                }
                throw;
            }
        }

        private static async Task GetPreconfiguredUserRolesAsync(RoleManager<IdentityRole<int>> roleManager) {
            var roles = new[] { UserRoles.Admin };
            foreach (var role in roles) {
                await roleManager.CreateAsync(new IdentityRole<int> { Name = role });
            }
        }

        private static IEnumerable<User> GetPreconfiguredUsers(ApplicationDbContext context) {
            return new List<User>() {
                new User {
                    Name = "root",
                    UserName = "root@test.com",
                    Email = "root@test.com",
                    ProfileColor = UserProfileColor.SKY,
                },
                new User {
                    Name = "Marcus Rodrigues",
                    UserName = "marcus.rodrigues95@gmail.com",
                    Email = "marcus.rodrigues95@gmail.com",
                    ProfileColor = UserProfileColor.GREEN,
                },
                new User {
                    Name = "John Doe",
                    UserName = "jdoe@test.com",
                    Email = "jdoe@test.com",
                    ProfileColor = UserProfileColor.ORANGE,
                },
                new User {
                    Name = "Debbie Ray",
                    UserName = "dray@test.com",
                    Email = "dray@test.com",
                    ProfileColor = UserProfileColor.ROSE,
                },
                new User {
                    UserName = "hdook@test.com",
                    Name = "Heather Dook",
                    Email = "hdook@test.com",
                    ProfileColor = UserProfileColor.PURPLE,
                },
            };
        }

        private static async Task GetPreconfiguredAdminUsers(UserManager<User> userManager) {
            // Only the root user can be an admin at this time.
            var expectedAdmin = await userManager.FindByEmailAsync("root@test.com");
            if (expectedAdmin is not null) {
                await userManager.AddToRoleAsync(expectedAdmin, UserRoles.Admin);
            }
        }

        private static async Task<IEnumerable<Classroom>> GetPreconfiguredClassrooms(ApplicationDbContext context) {
            var users = await context.Users.ToListAsync();

            var classrooms = new List<Classroom>() {
                new Classroom {
                    Name = "Introduction to C# - SE42",
                },
                new Classroom {
                    Name = "Computer Programming - CP425",
                },
                new Classroom {
                    Name = "Group Dynamics - GD108",
                },
                new Classroom {
                    Name = "Networking Infrastructure - NI21",
                },
            };

            foreach (Classroom classroom in classrooms) {
                // To simplify the seed, the first user will be the creator of all classrooms.
                var isCreator = true;

                foreach (User user in users) {
                    classroom.Users.Add(new ClassroomUser {
                        User = user,
                        Classroom = classroom,
                        IsCreator = isCreator,
                    });

                    isCreator = false;
                }
            }

            return classrooms;
        }

        private static async Task<IEnumerable<Discussion>> GetPreConfiguredDiscussions(ApplicationDbContext context) {
            var users = await context.Users.ToListAsync();
            var classrooms = await context.Classrooms.ToListAsync();
            var discussions = new List<Discussion>();

            foreach (Classroom classroom in classrooms) {
                var r = new Random();
                var discussionCount = r.Next(1, 10);

                // Create a random number of discussions for this classroom.
                for (int i = 0; i < discussionCount; ++i) {
                    var randomUser = classroom.Users
                        .OrderBy(cu => r.NextDouble())
                        .First()
                        .User;

                    discussions.Add(new Discussion {
                        Name = $"{classroom.Name!.Split("-")[1]} - Discussion {i}".Trim(),
                        CreatedBy = randomUser,
                        Classroom = classroom,
                    });
                }
            }

            return discussions;
        }

        private static async Task<IEnumerable<Message>> GetPreconfiguredDiscussionMessages(ApplicationDbContext context) {
            var users = await context.Users.ToListAsync();
            var discussions = await context.Discussions.ToListAsync();
            var messages = new List<Message>();

            foreach (Discussion discussion in discussions) {
                var r = new Random();
                var messageCount = r.Next(0, 1000);

                // Generate a random range of messages for this discussion.
                for (int i = 0; i < messageCount; ++i) {
                    var randomUser = discussion.Classroom!.Users
                        .OrderBy(uc => r.NextDouble())
                        .First()
                        .User;

                    // A random date in the last three months.
                    var randomDate = DateTime.UtcNow.AddDays(r.Next(-90, 0));

                    messages.Add(new Message {
                        Discussion = discussion,
                        CreatedAt = randomDate,
                        UpdatedAt = randomDate,
                        CreatedBy = randomUser,
                        Content = RandomMessageGenerator.Generate(1, 1, 5, 1, 20)
                    });
                }
            }

            return messages;
        }

        private static async Task<IEnumerable<ClassroomTimelineEvent>> GetPreconfiguredClassroomTimelineEvents(
            ApplicationDbContext context) {
            var classrooms = await context.Classrooms.ToListAsync();
            var events = new List<ClassroomTimelineEvent>();

            foreach (Classroom classroom in classrooms) {
                events.Add(new ClassroomTimelineEvent {
                    TriggeredBy = classroom.Users.FirstOrDefault(x => x.IsCreator == true)!.User,
                    Classroom = classroom,
                    Event = ClassroomTimelineEventItem.CLASSROOM_CREATED
                });

                foreach (Discussion discussion in classroom.Discussions) {
                    events.Add(new ClassroomTimelineEvent {
                        TriggeredBy = discussion.CreatedBy,
                        Discussion = discussion,
                        Classroom = discussion.Classroom,
                        Event = ClassroomTimelineEventItem.DISCUSSION_CREATED
                    });
                }
            }

            return events;
        }
    }
}
