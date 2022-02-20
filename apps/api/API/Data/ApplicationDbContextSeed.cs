using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Common.Utilities;
using API.Data.Entities;
using API.Schema.Types.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Enums = API.Common.Enums;

namespace API.Data {
    public class ApplicationDbContextSeed {
        public static async Task SeedDataAsync(
            ApplicationDbContext context,
            UserManager<User> userManager,
            ILoggerFactory loggerFactory,
            int retry = 0) {
            try {
                if (!await context.States.AnyAsync()) {
                    await context.States.AddRangeAsync(GetPreconfiguredStates());
                    await context.SaveChangesAsync();
                }

                if (!await context.DelLogTypes.AnyAsync()) {
                    await context.DelLogTypes.AddRangeAsync(GetPreconfiguredDelLogTypes());
                    await context.SaveChangesAsync();
                }

                if (!await userManager.Users.AnyAsync()) {
                    foreach (User user in GetPreconfiguredUsers(context)) {
                        await userManager.CreateAsync(user, "Pa$$w0rd!");
                    }
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
            } catch (Exception ex) {
                if (retry < 10) {
                    retry++;
                    var log = loggerFactory.CreateLogger<ApplicationDbContextSeed>();
                    log.LogError(ex.Message);
                    await SeedDataAsync(context, userManager, loggerFactory, retry);
                }
                throw;
            }
        }

        private static IEnumerable<State> GetPreconfiguredStates() {
            return new List<State>() {
                new State {
                    Status = Enums.From.State(Enums.State.Active),
                },
                new State {
                    Status = Enums.From.State(Enums.State.Deleted),
                },
                new State {
                    Status = Enums.From.State(Enums.State.Inactive),
                },
                new State {
                    Status = Enums.From.State(Enums.State.Suspended)
                },
            };
        }

        private static IEnumerable<DelLogType> GetPreconfiguredDelLogTypes() {
            return new List<DelLogType>() {
                new DelLogType {
                    Type = Enums.DelLogType.Classrooms
                },
                new DelLogType {
                    Type = Enums.DelLogType.Discussions
                },
                new DelLogType {
                    Type = Enums.DelLogType.Messages
                },
            };
        }

        private static IEnumerable<User> GetPreconfiguredUsers(ApplicationDbContext context) {
            return new List<User>() {
                new User {
                    Name = "Marcus Rodrigues",
                    UserName = "mrodrigues@test.com",
                    Email = "mrodrigues@test.com",
                    ProfileColor = UserProfileColor.GREEN,
                    State = GetState(context)
                },
                new User {
                    Name = "John Doe",
                    UserName = "jdoe@test.com",
                    Email = "jdoe@test.com",
                    ProfileColor = UserProfileColor.ORANGE,
                    State = GetState(context)
                },
                new User {
                    Name = "Debbie Ray",
                    UserName = "dray@test.com",
                    Email = "dray@test.com",
                    ProfileColor = UserProfileColor.ROSE,
                    State = GetState(context)
                },
                new User {
                    Name = "Heather Dook",
                    UserName = "hdook@test.com",
                    Email = "hdook@test.com",
                    ProfileColor = UserProfileColor.PURPLE,
                    State = GetState(context)
                },
            };
        }

        private static async Task<IEnumerable<Classroom>> GetPreconfiguredClassrooms(ApplicationDbContext context) {
            var users = await context.Users.ToListAsync();

            var classrooms = new List<Classroom>() {
                new Classroom {
                    Name = "Introduction to C# - SE42",
                    State = GetState(context),
                },
                new Classroom {
                    Name = "Computer Programming - CP425",
                    State = GetState(context)
                },
                new Classroom {
                    Name = "Group Dynamics - GD108",
                    State = GetState(context)
                },
                new Classroom {
                    Name = "Networking Infrastructure - NI21",
                    State = GetState(context)
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
                        State = GetState(context)
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

        private static State GetState(ApplicationDbContext context, int skip = 0) =>
            context.States.OrderBy(x => x.Id).Skip(skip).First();
    }
}
