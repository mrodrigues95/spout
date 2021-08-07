using API.Data.Entities;
using Enums = API.Common.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Common.Utilities;

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
                    await context.Classrooms.AddRangeAsync(GetPreconfiguredClassrooms(context));
                    await context.SaveChangesAsync();
                }

                if (!await context.UserClassrooms.AnyAsync()) {
                    await context.UserClassrooms.AddRangeAsync(await GetPreConfiguredUserClassrooms(context));
                    await context.SaveChangesAsync();
                }

                if (!await context.Discussions.AnyAsync()) {
                    await context.Discussions.AddRangeAsync(await GetPreConfiguredDiscussions(context));
                    await context.SaveChangesAsync();
                }

                if (!await context.UserDiscussions.AnyAsync()) {
                    await context.UserDiscussions.AddRangeAsync(await GetPreConfiguredUserDiscussions(context));
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
                        State = GetState(context)
                    },
                    new User {
                        Name = "John Doe",
                        UserName = "jdoe@test.com",
                        Email = "jdoe@test.com",
                        State = GetState(context)
                    },
                    new User {
                        Name = "Debbie Ray",
                        UserName = "dray@test.com",
                        Email = "dray@test.com",
                        State = GetState(context)
                    },
                    new User {
                        Name = "Heather Dook",
                        UserName = "hdook@test.com",
                        Email = "hdook@test.com",
                        State = GetState(context)
                    },
                };
        }

        private static IEnumerable<Classroom> GetPreconfiguredClassrooms(ApplicationDbContext context) {
            return new List<Classroom>() {
                    new Classroom {
                        Name = "Introduction to C# - SE42",
                        CreatedBy = GetUser(context),
                        StateId = GetState(context).Id,
                        State = GetState(context)
                    },
                    new Classroom {
                        Name = "Computer Programming - CP425",
                        CreatedBy = GetUser(context, skip: 1),
                        State = GetState(context)
                    },
                    new Classroom {
                        Name = "Group Dynamics - GD108",
                        CreatedBy = GetUser(context, skip: 2),
                        State = GetState(context)
                    },
                    new Classroom {
                        Name = "Networking Infrastructure - NI21",
                        CreatedBy = GetUser(context, skip: 3),
                        State = GetState(context)
                    },
                };
        }

        private static async Task<IEnumerable<UserClassroom>> GetPreConfiguredUserClassrooms(ApplicationDbContext context) {
            var users = await context.Users.ToListAsync();
            var classrooms = await context.Classrooms.ToListAsync();
            var userClassrooms = new List<UserClassroom>();

            // Every user is in every classroom.
            foreach (User user in users) {
                foreach (Classroom classroom in classrooms) {
                    userClassrooms.Add(new UserClassroom {
                        User = user,
                        Classroom = classroom
                    });
                }
            }

            return userClassrooms;
        }

        private static async Task<IEnumerable<Discussion>> GetPreConfiguredDiscussions(ApplicationDbContext context) {
            var users = await context.Users.ToListAsync();
            var classrooms = await context.Classrooms.ToListAsync();
            var discussions = new List<Discussion>();

            foreach (Classroom classroom in classrooms) {
                var r = new Random();

                // Create a random number of discussions for this classroom.
                for (int i = 1; i < r.Next(1, 5); i++) {
                    var random = classroom.UserClassrooms
                        .OrderBy(uc => r.NextDouble()).First();

                    discussions.Add(new Discussion {
                        Name = $"{classroom.Name!.Split("-")[1]} - Discussion {i}",
                        CreatedBy = random.User,
                        Classroom = classroom,
                        State = GetState(context)
                    });
                }
            }

            return discussions;
        }

        private static async Task<IEnumerable<UserDiscussion>> GetPreConfiguredUserDiscussions(ApplicationDbContext context) {
            var users = await context.Users.ToListAsync();
            var discussions = await context.Discussions.ToListAsync();
            var userDiscussions = new List<UserDiscussion>();

            foreach (Discussion discussion in discussions) {
                // The creator of the discussion must be added automatically.
                userDiscussions.Add(new UserDiscussion {
                    User = discussion.CreatedBy,
                    Discussion = discussion
                });

                var random = new Random();
                for (int i = 0; i < random.Next(0, users.Count); i++) {
                    if (userDiscussions.Find(x => x.User == users[i]) is null) {
                        userDiscussions.Add(new UserDiscussion {
                            User = users[i],
                            Discussion = discussion
                        });
                    }
                }
            }

            return userDiscussions;
        }

        private static async Task<IEnumerable<Message>> GetPreconfiguredDiscussionMessages(ApplicationDbContext context) {
            var users = await context.Users.ToListAsync();
            var discussions = await context.Discussions.ToListAsync();
            var messages = new List<Message>();

            foreach (Discussion discussion in discussions) {
                var r = new Random();

                for (int i = 0; i < 162; ++i) {
                    var randomUser = discussion.UserDiscussions
                        .OrderBy(uc => r.NextDouble()).First().User;

                    // A random date in the last three months.
                    var randomDate = DateTime.UtcNow.AddDays(r.Next(-90, 0));

                    messages.Add(new Message {
                        Discussion = discussion,
                        CreatedAt = randomDate,
                        UpdatedAt = randomDate,
                        CreatedBy = randomUser,
                        Body = RandomMessageGenerator.Generate(1, 1, 5, 1, 20)
                    });
                }
            }

            return messages;
        }

        private static State GetState(ApplicationDbContext context, int skip = 0) =>
            context.States.OrderBy(x => x.Id).Skip(skip).First();
        private static User GetUser(ApplicationDbContext context, int skip = 0) =>
            context.Users.OrderBy(x => x.Id).Skip(skip).First();
    }
}
