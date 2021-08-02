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
        // TODO: Fix members not showing in some groups.
        // TODO: Make discussion messages different days instead of now.
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
                    await context.UserClassrooms.AddRangeAsync(GetPreConfiguredUserClassrooms(context));
                    await context.SaveChangesAsync();
                }

                if (!await context.Discussions.AnyAsync()) {
                    await context.Discussions.AddRangeAsync(GetPreConfiguredDiscussions(context));
                    await context.SaveChangesAsync();
                }

                if (!await context.UserDiscussions.AnyAsync()) {
                    await context.UserDiscussions.AddRangeAsync(GetPreConfiguredUserDiscussions(context));
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
                    Status = Enums.From.State(Enums.State.Active),
                },
                new State {
                    Status = Enums.From.State(Enums.State.Active),
                },
                new State {
                    Status = Enums.From.State(Enums.State.Active)
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
                        Name = "UX Fundamentals - UX302",
                        CreatedBy = GetUser(context),
                        State = GetState(context)
                    },
                    new Classroom {
                        Name = "Networking Infrastructure - NI21",
                        CreatedBy = GetUser(context, skip: 3),
                        State = GetState(context)
                    },
                };
        }

        private static IEnumerable<UserClassroom> GetPreConfiguredUserClassrooms(ApplicationDbContext context) {
            return new List<UserClassroom>() {
                    new UserClassroom {
                        User = GetUser(context),
                        Classroom = GetClassroom(context)
                    },
                    new UserClassroom {
                        User = GetUser(context, skip: 2),
                        Classroom = GetClassroom(context)
                    },
                    new UserClassroom {
                        User = GetUser(context, skip: 3),
                        Classroom = GetClassroom(context)
                    },
                    new UserClassroom {
                        User = GetUser(context, skip: 1),
                        Classroom = GetClassroom(context, skip: 1)
                    },
                    new UserClassroom {
                        User = GetUser(context, skip: 2),
                        Classroom = GetClassroom(context, skip: 1)
                    },
                    new UserClassroom {
                        User = GetUser(context, skip: 2),
                        Classroom = GetClassroom(context, skip: 2)
                    },
                    new UserClassroom {
                        User = GetUser(context),
                        Classroom = GetClassroom(context, skip: 3)
                    },
                    new UserClassroom {
                        User = GetUser(context, skip: 1),
                        Classroom = GetClassroom(context, skip: 3)
                    },
                    new UserClassroom {
                        User = GetUser(context, skip: 3),
                        Classroom = GetClassroom(context, skip: 4)
                    },
                    new UserClassroom {
                        User = GetUser(context, skip: 2),
                        Classroom = GetClassroom(context, skip: 4)
                    },
                    new UserClassroom {
                        User = GetUser(context, skip: 1),
                        Classroom = GetClassroom(context, skip: 4)
                    },
                };
        }

        private static IEnumerable<Discussion> GetPreConfiguredDiscussions(ApplicationDbContext context) {
            return new List<Discussion>() { 
                new Discussion {
                    Name = "Assignment help",
                    CreatedBy = GetUser(context),
                    Classroom = GetClassroom(context),
                    State = GetState(context)
                },
                new Discussion {
                    Name = "Off topic",
                    CreatedBy = GetUser(context),
                    Classroom = GetClassroom(context),
                    State = GetState(context)
                },
                new Discussion {
                    Name = "Exam help",
                    CreatedBy = GetUser(context),
                    Classroom = GetClassroom(context),
                    State = GetState(context)
                },
                new Discussion {
                    Name = "Teacher AMA",
                    CreatedBy = GetUser(context, skip: 1),
                    Classroom = GetClassroom(context, skip: 1),
                    State = GetState(context)
                },
                new Discussion {
                    Name = "Pair programming",
                    CreatedBy = GetUser(context, skip: 2),
                    Classroom = GetClassroom(context, skip: 2),
                    State = GetState(context)
                },
                new Discussion {
                    Name = "Design topics",
                    CreatedBy = GetUser(context),
                    Classroom = GetClassroom(context, skip: 3),
                    State = GetState(context)
                },
                new Discussion {
                    Name = "Frontend",
                    CreatedBy = GetUser(context, skip: 1),
                    Classroom = GetClassroom(context, skip: 3),
                    State = GetState(context)
                },
                new Discussion {
                    Name = "Job help",
                    CreatedBy = GetUser(context, skip: 3),
                    Classroom = GetClassroom(context, skip: 4),
                    State = GetState(context)
                },
                new Discussion {
                    Name = "Course stuff",
                    CreatedBy = GetUser(context, skip: 2),
                    Classroom = GetClassroom(context, skip: 4),
                    State = GetState(context)
                },
                new Discussion {
                    Name = "Reading",
                    CreatedBy = GetUser(context, skip: 1),
                    Classroom = GetClassroom(context, skip: 4),
                    State = GetState(context)
                },
            };
        }

        private static IEnumerable<UserDiscussion> GetPreConfiguredUserDiscussions(ApplicationDbContext context) {
            return new List<UserDiscussion>() {
                new UserDiscussion {
                    User = GetUser(context),
                    Discussion = GetDiscussion(context)
                },
                new UserDiscussion {
                    User = GetUser(context, skip: 2),
                    Discussion = GetDiscussion(context)
                },
                new UserDiscussion {
                    User = GetUser(context, skip: 3),
                    Discussion = GetDiscussion(context)
                },
                new UserDiscussion {
                    User = GetUser(context, skip: 1),
                    Discussion = GetDiscussion(context, skip: 1)
                },
                new UserDiscussion {
                    User = GetUser(context, skip: 2),
                    Discussion = GetDiscussion(context, skip: 1)
                },
                new UserDiscussion {
                    User = GetUser(context, skip: 2),
                    Discussion = GetDiscussion(context, skip: 2)
                },
                new UserDiscussion {
                    User = GetUser(context),
                    Discussion = GetDiscussion(context, skip: 3)
                }, 
                new UserDiscussion {
                    User = GetUser(context, skip: 1),
                    Discussion = GetDiscussion(context, skip: 3)
                },
                new UserDiscussion {
                    User = GetUser(context, skip: 3),
                    Discussion = GetDiscussion(context, skip: 4)
                },
                new UserDiscussion {
                    User = GetUser(context, skip: 2),
                    Discussion = GetDiscussion(context, skip: 4)
                },
                new UserDiscussion {
                    User = GetUser(context, skip: 1),
                    Discussion = GetDiscussion(context, skip: 4)
                },
            };
        }

        private static async Task<IEnumerable<Message>> GetPreconfiguredDiscussionMessages(ApplicationDbContext context) {
            var discussions = await context.Discussions.ToListAsync();
            var messages = new List<Message>();

            foreach (Discussion discussion in discussions) {
                for (int i = 0; i < 500; ++i) {
                    messages.Add(new Message {
                        Discussion = discussion,
                        CreatedBy = discussion.CreatedBy,
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
        private static Classroom GetClassroom(ApplicationDbContext context, int skip = 0) =>
            context.Classrooms.OrderBy(x => x.Id).Skip(skip).First();
        private static Discussion GetDiscussion(ApplicationDbContext context, int skip = 0) =>
            context.Discussions.OrderBy(x => x.Id).Skip(skip).First();
    }
}
