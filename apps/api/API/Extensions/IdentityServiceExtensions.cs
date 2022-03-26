using System;
using API.Data;
using API.Data.Entities;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace API.Extensions {
    public static class IdentityServiceExtensions {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services) {
            services.AddDefaultIdentity<User>(opts => {
                opts.User.RequireUniqueEmail = true;

                opts.Lockout.AllowedForNewUsers = false;

                opts.SignIn.RequireConfirmedEmail = false;
                opts.SignIn.RequireConfirmedAccount = false;

                opts.Password.RequireNonAlphanumeric = false;
                opts.Password.RequireDigit = false;
                opts.Password.RequireUppercase = false;
                opts.Password.RequireLowercase = false;
                opts.Password.RequiredLength = 6;

                opts.Tokens.ChangeEmailTokenProvider = "CustomChangeEmailTokenProvider";
                opts.Tokens.EmailConfirmationTokenProvider = "CustomEmailConfirmationTokenProvider";
                opts.Tokens.PasswordResetTokenProvider = "CustomPasswordResetTokenProvider";
            })
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders()
            .AddTokenProvider<CustomChangeEmailTokenProvider<User>>("CustomChangeEmailTokenProvider")
            .AddTokenProvider<CustomEmailConfirmationTokenProvider<User>>("CustomEmailConfirmationTokenProvider")
            .AddTokenProvider<CustomPasswordResetTokenProvider<User>>("CustomPasswordResetTokenProvider");

            services.Configure<CustomChangeEmailTokenProviderOptions>(opts => {
                opts.TokenLifespan = TimeSpan.FromDays(1);
            });

            services.Configure<CustomEmailConfirmationTokenProviderOptions>(opts => {
                opts.TokenLifespan = TimeSpan.FromDays(1);
            });

            services.Configure<CustomPasswordResetTokenProviderOptions>(opts => {
                opts.TokenLifespan = TimeSpan.FromDays(1);
            });

            services.ConfigureApplicationCookie(opts => {
                opts.Cookie.Name = "SP_IDENTITY";
                opts.Cookie.HttpOnly = true;
                opts.Cookie.SameSite = SameSiteMode.Strict;
                opts.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                opts.ExpireTimeSpan = TimeSpan.FromDays(7);
                opts.SlidingExpiration = true;
            });

            return services;
        }
    }

    public class CustomChangeEmailTokenProvider<TUser>
        : DataProtectorTokenProvider<TUser> where TUser : class {
        public CustomChangeEmailTokenProvider(
            IDataProtectionProvider dataProtectionProvider,
            IOptions<CustomChangeEmailTokenProviderOptions> options,
            ILogger<DataProtectorTokenProvider<TUser>> logger)
                : base(dataProtectionProvider, options, logger) {
        }
    }

    public class CustomChangeEmailTokenProviderOptions : DataProtectionTokenProviderOptions { }

    public class CustomEmailConfirmationTokenProvider<TUser>
        : DataProtectorTokenProvider<TUser> where TUser : class {
        public CustomEmailConfirmationTokenProvider(
            IDataProtectionProvider dataProtectionProvider,
            IOptions<CustomEmailConfirmationTokenProviderOptions> options,
            ILogger<DataProtectorTokenProvider<TUser>> logger)
                : base(dataProtectionProvider, options, logger) {
        }
    }

    public class CustomEmailConfirmationTokenProviderOptions : DataProtectionTokenProviderOptions { }

    public class CustomPasswordResetTokenProvider<TUser>
        : DataProtectorTokenProvider<TUser> where TUser : class {
        public CustomPasswordResetTokenProvider(
            IDataProtectionProvider dataProtectionProvider,
            IOptions<CustomPasswordResetTokenProviderOptions> options,
            ILogger<DataProtectorTokenProvider<TUser>> logger)
                : base(dataProtectionProvider, options, logger) {
        }
    }

    public class CustomPasswordResetTokenProviderOptions : DataProtectionTokenProviderOptions { }
}
