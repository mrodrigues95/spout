using API.Schema.Entities.Classroom;
using API.Schema.Entities.Discussion;
using API.Schema.Entities.Session;
using API.Schema.Entities.User;
using API.Schema.Services.Auth;
using AppAny.HotChocolate.FluentValidation;
using HotChocolate.AspNetCore;
using HotChocolate.Execution;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace API.Extensions {
    public static class HotChocolateServiceExtensions {
        public static IServiceCollection AddHotChocolateServices(this IServiceCollection services) {
            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            var gql = services.AddGraphQLServer();
            gql
                .AddAuthorization()
                .AddHttpRequestInterceptor<CustomHttpRequestInterceptor>()
                .AddFiltering()
                .AddFluentValidation()
                .EnableRelaySupport()
                .ModifyRequestOptions(opt => {
                    opt.IncludeExceptionDetails = env == Environments.Development;
                });

            gql
                .AddQueryType()
                    .AddTypeExtension<UserQueries>()
                    .AddTypeExtension<SessionQueries>()
                    .AddTypeExtension<ClassroomQueries>()
                    .AddTypeExtension<DiscussionQueries>()
                    .AddTypeExtension<AuthQueries>();

            gql
                .AddMutationType()
                    .AddTypeExtension<ClassroomMutations>()
                    .AddTypeExtension<AuthMutations>()
                    .AddTypeExtension<SessionMutations>();

            gql
                .AddType<UserType>()
                .AddType<SessionType>()
                .AddType<ClassroomType>()
                .AddType<DiscussionType>();

            gql
                .AddDataLoader<UserByIdDataLoader>()
                .AddDataLoader<SessionByIdDataLoader>()
                .AddDataLoader<ClassroomByIdDataLoader>()
                .AddDataLoader<DiscussionByIdDataLoader>();

            return services;
        }

        private class CustomHttpRequestInterceptor : DefaultHttpRequestInterceptor {
            public async override ValueTask OnCreateAsync(
                HttpContext context,
                IRequestExecutor requestExecutor,
                IQueryRequestBuilder requestBuilder,
                CancellationToken cancellationToken) {
                await base.OnCreateAsync(context, requestExecutor, requestBuilder, cancellationToken);

                int? userId = null;
                string? userEmail = null;

                if (context.User.Identity?.IsAuthenticated ?? false) {
                    userId = int.Parse(context.User.FindFirstValue(ClaimTypes.NameIdentifier));
                    userEmail = context.User.FindFirstValue(ClaimTypes.Email);
                }

                requestBuilder.TryAddProperty("userId", userId);
                requestBuilder.TryAddProperty("userEmail", userEmail);
            }
        }
    }
}
