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
            services.AddDefaultIdentity<User>(opt => {
                opt.User.RequireUniqueEmail = true;

                opt.SignIn.RequireConfirmedEmail = false;
                opt.SignIn.RequireConfirmedAccount = false;

                opt.Password.RequireNonAlphanumeric = false;
                opt.Password.RequireDigit = false;
                opt.Password.RequireUppercase = false;
                opt.Password.RequireLowercase = false;
                opt.Password.RequiredLength = 6;

                opt.Tokens.ChangeEmailTokenProvider = "CustomChangeEmailTokenProvider";
                opt.Tokens.EmailConfirmationTokenProvider = "CustomEmailConfirmationTokenProvider";
                opt.Tokens.PasswordResetTokenProvider = "CustomPasswordResetTokenProvider";
            })
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders()
            .AddTokenProvider<CustomChangeEmailTokenProvider<User>>("CustomChangeEmailTokenProvider")
            .AddTokenProvider<CustomEmailConfirmationTokenProvider<User>>("CustomEmailConfirmationTokenProvider")
            .AddTokenProvider<CustomPasswordResetTokenProvider<User>>("CustomPasswordResetTokenProvider");

            services.Configure<CustomChangeEmailTokenProviderOptions>(opt => {
                opt.TokenLifespan = TimeSpan.FromDays(1);
            });

            services.Configure<CustomEmailConfirmationTokenProviderOptions>(opt => {
                opt.TokenLifespan = TimeSpan.FromDays(1);
            });

            services.Configure<CustomPasswordResetTokenProviderOptions>(opt => {
                opt.TokenLifespan = TimeSpan.FromDays(1);
            });

            services.ConfigureApplicationCookie(opt => {
                opt.Cookie.Name = "SP_IDENTITY";
                opt.Cookie.HttpOnly = true;
                opt.Cookie.SameSite = SameSiteMode.Strict;
                opt.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                opt.ExpireTimeSpan = TimeSpan.FromDays(7);
                opt.SlidingExpiration = true;
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
