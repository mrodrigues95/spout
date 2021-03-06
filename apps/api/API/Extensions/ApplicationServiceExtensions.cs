using API.Data;
using API.Infrastructure;
using API.Security.Policy;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions {
    public static class ApplicationServiceExtensions {
        public static IServiceCollection AddApplicationServices(
            this IServiceCollection services,
            IConfiguration config) {
            services.AddPooledDbContextFactory<ApplicationDbContext>(opts => {
                opts.UseNpgsql(config.GetConnectionString("DefaultConnection"));
                opts.UseSnakeCaseNamingConvention();
                //opt.LogTo(Console.WriteLine);
            });

            services.AddControllers()
                .AddFluentValidation(cfg => {
                    cfg.RegisterValidatorsFromAssemblyContaining<Startup>();
                });

            services.AddCors(opts => {
                opts.AddPolicy("CorsPolicy", policy => {
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
            services.Configure<TwilioConfig>(config.GetSection("TwilioConfig"));

            services.AddScoped(p =>
                p.GetRequiredService<IDbContextFactory<ApplicationDbContext>>()
                    .CreateDbContext());

            services.AddTransient<IBlobService, BlobService>();
            services.AddTransient<IEmailSender, EmailSender>();
            services.AddTransient<ISessionManager, SessionManager>();
            services.AddTransient<ISMSService, SMSService>();
            services.AddTransient<IClassroomTimelineManager, ClassroomTimelineManager>();
            services.AddTransient<IAuthorizationHandler, ClassroomAuthorizationHandler>();

            return services;
        }
    }
}
