using System;
using System.Threading.Tasks;
using API.Data;
using API.Data.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Npgsql;

namespace API {
    public class Program {
        public static async Task Main(string[] args) {
            var host = CreateHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
            using (var ctx = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>()) {
                var services = scope.ServiceProvider;
                var loggerFactory = services.GetRequiredService<ILoggerFactory>();
                var conn = (NpgsqlConnection)ctx.Database.GetDbConnection();

                try {
                    var userManager = services.GetRequiredService<UserManager<User>>();
                    var roleManager = services.GetRequiredService<RoleManager<IdentityRole<int>>>();
                    await ctx.Database.MigrateAsync();

                    // Npgsql needs to reload the types for enums to work properly during seeding.
                    // https://www.npgsql.org/efcore/mapping/enum.html?tabs=tabid-1
                    await conn.OpenAsync();
                    conn.ReloadTypes();

                    await ApplicationDbContextSeed.SeedDataAsync(
                        ctx,
                        userManager,
                        roleManager,
                        loggerFactory);
                } catch (Exception ex) {
                    var logger = loggerFactory.CreateLogger<Program>();
                    logger.LogError(ex, "An error occured while seeding the database.");
                }
            }

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
