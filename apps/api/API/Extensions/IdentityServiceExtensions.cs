﻿using API.Data;
using API.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace API.Extensions {
    public static class IdentityServiceExtensions {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services) {
            services.AddDefaultIdentity<User>(opt => {
                opt.User.RequireUniqueEmail = true;
            })  
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

            services.ConfigureApplicationCookie(opt => {
                opt.Cookie.Name = "SP_IDENTITY";
                opt.Cookie.HttpOnly = true;
                opt.ExpireTimeSpan = TimeSpan.FromDays(7);
                opt.Cookie.SameSite = SameSiteMode.Strict;
                opt.Cookie.SecurePolicy = CookieSecurePolicy.None; // TODO: Change this to `Always` once we configure HTTPS.
                opt.SlidingExpiration = true;
            });

            return services;
        }
    }
}