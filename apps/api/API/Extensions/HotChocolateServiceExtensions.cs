using API.Schema.Mutations.Auth;
using API.Schema.Mutations.Classrooms;
using API.Schema.Mutations.Discussions;
using API.Schema.Mutations.Sessions;
using API.Schema.Queries.Classrooms;
using API.Schema.Queries.Discussions;
using API.Schema.Queries.Messages;
using API.Schema.Queries.Sessions;
using API.Schema.Queries.Users;
using API.Schema.Subscriptions.Discussions;
using API.Schema.Types.Classrooms;
using API.Schema.Types.Discussions;
using API.Schema.Types.Messages;
using API.Schema.Types.Sessions;
using API.Schema.Types.Users;
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
                .AddFluentValidation()
                .EnableRelaySupport()
                .AddInMemorySubscriptions()
                .AddFiltering()
                .AddSorting()
                .ModifyRequestOptions(opt => {
                    opt.IncludeExceptionDetails = env == Environments.Development;
                });

            gql
                .AddQueryType()
                    .AddTypeExtension<UserQueries>()
                    .AddTypeExtension<SessionQueries>()
                    .AddTypeExtension<ClassroomQueries>()
                    .AddTypeExtension<DiscussionQueries>();

            gql
                .AddMutationType()
                    .AddTypeExtension<ClassroomMutations>()
                    .AddTypeExtension<DiscussionMutations>()
                    .AddTypeExtension<AuthMutations>()
                    .AddTypeExtension<SessionMutations>();

            gql
                .AddSubscriptionType()
                    .AddTypeExtension<DiscussionSubscriptions>();

            gql
                .AddType<UserType>()
                .AddType<SessionType>()
                .AddType<ClassroomType>()
                .AddType<DiscussionType>()
                .AddType<MessageType>();

            gql
                .AddDataLoader<UserByIdDataLoader>()
                .AddDataLoader<SessionByIdDataLoader>()
                .AddDataLoader<ClassroomByIdDataLoader>()
                .AddDataLoader<DiscussionByIdDataLoader>()
                .AddDataLoader<MessageByIdDataLoader>();

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

                // This can also be done by injecting `ClaimsPrincipal` now.
                // See: https://github.com/ChilliCream/hotchocolate/issues/3824
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
