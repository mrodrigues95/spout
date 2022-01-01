using API.Schema.Mutations.Auth;
using API.Schema.Mutations.Classrooms;
using API.Schema.Mutations.Discussions;
using API.Schema.Mutations.Files;
using API.Schema.Mutations.Sessions;
using API.Schema.Queries.Classrooms;
using API.Schema.Queries.Discussions;
using API.Schema.Queries.Files;
using API.Schema.Queries.Sessions;
using API.Schema.Queries.Users;
using API.Schema.Subscriptions.Discussions;
using API.Schema.Types.Classrooms;
using API.Schema.Types.Discussions;
using API.Schema.Types.Files;
using API.Schema.Types.Sessions;
using API.Schema.Types.Users;
using HotChocolate;
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

            // Add GraphQL core services.
            var gql = services.AddGraphQLServer();

            gql
                .AddQueryType()
                .AddMutationType()
                .AddSubscriptionType();

            gql
                .AddTypeExtension<UserQueries>()
                .AddDataLoader<UserByIdDataLoader>()
                .AddType<UserType>()
                .AddType<UserProfileColorType>()
                .AddType<UserFilterInputType>();

            gql
                .AddTypeExtension<SessionQueries>()
                .AddTypeExtension<SessionMutations>()
                .AddDataLoader<SessionByIdDataLoader>()
                .AddType<SessionType>();

            gql
                .AddTypeExtension<ClassroomQueries>()
                .AddTypeExtension<ClassroomMutations>()
                .AddDataLoader<ClassroomByIdDataLoader>()
                .AddType<ClassroomType>();

            gql
                .AddTypeExtension<DiscussionQueries>()
                .AddTypeExtension<DiscussionMutations>()
                .AddTypeExtension<DiscussionSubscriptions>()
                .AddDataLoader<DiscussionByIdDataLoader>()
                .AddType<DiscussionType>()
                .AddType<DiscussionEventType>()
                .AddType<DiscussionFilterInputType>();

            gql
                .AddTypeExtension<AuthMutations>();

            gql
                .AddTypeExtension<FileQueries>()
                .AddTypeExtension<FileMutations>()
                .AddDataLoader<FileByIdDataLoader>()
                .AddType<FileType>()
                .AddType<FileUploadStatusType>()
                .AddType<WhitelistedFileExtensionType>();

            gql
                .AddAuthorization()
                .AddHttpRequestInterceptor<CustomHttpRequestInterceptor>()
                .AddDiagnosticEventListener<CustomDiagnosticEventListener>()
                .AddFairyBread()
                //.AddMutationConventions()
                .AddInMemorySubscriptions()
                .AddFiltering()
                .AddSorting()
                .AddGlobalObjectIdentification()
                .AddQueryFieldToMutationPayloads()
                .ModifyRequestOptions(opts => {
                  opts.IncludeExceptionDetails = env == Environments.Development;
                });

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
