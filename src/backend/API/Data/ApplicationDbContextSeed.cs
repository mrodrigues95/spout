using API.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data {
    public class ApplicationDbContextSeed {
        public static async Task SeedDataAsync(
            ApplicationDbContext context,
            UserManager<User> userManager,
            ILoggerFactory loggerFactory,
            int retry = 0) {
            try {
                if (!await userManager.Users.AnyAsync()) {
                    foreach (User user in GetPreconfiguredUsers()) {
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

        private static IEnumerable<User> GetPreconfiguredUsers() {
            return new List<User>() {
                    new User {
                        FirstName = "Marcus",
                        LastName = "Rodrigues",
                        UserName = "mrodrigues@test.com",
                        Email = "mrodrigues@test.com",
                        UpdatedAt = DateTime.UtcNow
                    },
                    new User {
                        FirstName = "John",
                        LastName = "Doe",
                        UserName = "jdoe@test.com",
                        Email = "jdoe@test.com",
                        UpdatedAt = DateTime.UtcNow
                    },
                    new User {
                        FirstName = "Debbie",
                        LastName = "Ray",
                        UserName = "dray@test.com",
                        Email = "dray@test.com",
                        UpdatedAt = DateTime.UtcNow
                    },
                    new User {
                        FirstName = "Heather",
                        LastName = "Dook",
                        UserName = "hdook@test.com",
                        Email = "hdook@test.com",
                        UpdatedAt = DateTime.UtcNow
                    },
                };
        }

        private static IEnumerable<Classroom> GetPreconfiguredClassrooms(ApplicationDbContext context) {
            return new List<Classroom>() {
                    new Classroom {
                        Name = "Introduction to C#",
                        UpdatedAt = DateTime.UtcNow,
                        CreatedBy = GetUser(context)
                    },
                    new Classroom {
                        Name = "Computer Programming",
                        UpdatedAt = DateTime.UtcNow,
                        CreatedBy = GetUser(context, skip: 1)
                    },
                    new Classroom {
                        Name = "Assignment Help",
                        UpdatedAt = DateTime.UtcNow,
                        CreatedBy = GetUser(context, skip: 2)
                    },
                    new Classroom {
                        Name = "Other",
                        UpdatedAt = DateTime.UtcNow,
                        CreatedBy = GetUser(context)
                    },
                    new Classroom {
                        Name = "Networking Infrastructure",
                        UpdatedAt = DateTime.UtcNow,
                        CreatedBy = GetUser(context, skip: 3)
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

        private static User GetUser(ApplicationDbContext context, int skip = 0) =>
            context.Users.OrderBy(x => x.Id).Skip(skip).First();

        private static Classroom GetClassroom(ApplicationDbContext context, int skip = 0) =>
            context.Classrooms.OrderBy(x => x.Id).Skip(skip).First();
    }
}
