using API.Data;
using API.Infrastructure;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions {
    public static class ApplicationServiceExtensions {
        public static IServiceCollection AddApplicationServices(
            this IServiceCollection services,
            IConfiguration config) {
            services.AddPooledDbContextFactory<ApplicationDbContext>(opt => {
                opt.UseNpgsql(config.GetConnectionString("DefaultConnection"));
                opt.UseSnakeCaseNamingConvention();
                //opt.LogTo(Console.WriteLine);
            });

            services.AddScoped(p =>
                p.GetRequiredService<IDbContextFactory<ApplicationDbContext>>()
                    .CreateDbContext());

            services.AddControllers()
                .AddFluentValidation(cfg => {
                    cfg.RegisterValidatorsFromAssemblyContaining<Startup>();
                });

            services.AddCors(opt => {
                opt.AddPolicy("CorsPolicy", policy => {
                    policy
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials()
                        .WithOrigins(new[] {
                            "http://spout.dev", "http://localhost:3000",
                            "https://spout.dev", "https://localhost:3000"
                        });
                });
            });

            services.Configure<AzureStorageConfig>(config.GetSection("AzureStorageConfig"));
            services.Configure<PostmarkConfig>(config.GetSection("PostmarkConfig"));
            services.AddScoped<IBlobService, BlobService>();
            services.AddScoped<IEmailSender, EmailSender>();
            services.AddScoped<ISessionManager, SessionManager>();

            return services;
        }
    }
}
