using System;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using API.Data;
using API.Data.Entities;
using API.Infrastructure;
using API.Schema.Mutations.Auth;
using API.Schema.Mutations.ClassroomAnnouncements;
using API.Schema.Mutations.ClassroomReminders;
using API.Schema.Mutations.Classrooms;
using API.Schema.Mutations.ClassroomSyllabus;
using API.Schema.Mutations.Discussions;
using API.Schema.Mutations.Files;
using API.Schema.Mutations.Users;
using API.Schema.Queries.ClassroomAnnouncements;
using API.Schema.Queries.ClassroomInvites;
using API.Schema.Queries.ClassroomReminders;
using API.Schema.Queries.Classrooms;
using API.Schema.Queries.ClassroomSyllabus;
using API.Schema.Queries.ClassroomTimelineEvents;
using API.Schema.Queries.Discussions;
using API.Schema.Queries.Files;
using API.Schema.Queries.Messages;
using API.Schema.Queries.Sessions;
using API.Schema.Queries.Users;
using API.Schema.Subscriptions.Discussions;
using API.Schema.Types.ClassroomAnnouncements;
using API.Schema.Types.ClassroomInvites;
using API.Schema.Types.ClassroomReminders;
using API.Schema.Types.Classrooms;
using API.Schema.Types.ClassroomSyllabus;
using API.Schema.Types.ClassroomTimelineEvents;
using API.Schema.Types.Discussions;
using API.Schema.Types.Files;
using API.Schema.Types.Messages;
using API.Schema.Types.Sessions;
using API.Schema.Types.Users;
using HotChocolate;
using HotChocolate.AspNetCore;
using HotChocolate.Data;
using HotChocolate.Execution;
using HotChocolate.Types.Pagination;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace API.Extensions {
    public static class HotChocolateServiceExtensions {
        public static IServiceCollection AddHotChocolateServices(this IServiceCollection services) {
            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            // Add GraphQL core services.
            var gql = services.AddGraphQLServer();

            gql
                .AddQueryType()
                .AddMutationType()
                .AddSubscriptionType()
                .AddFiltering()
                .AddSorting()
                .AddProjections()
                .AddAuthorization()
                .AddMutationConventions()
                .AddFairyBread()
                .AddInMemorySubscriptions()
                .AddGlobalObjectIdentification()
                .AddQueryFieldToMutationPayloads()
                .AddHttpRequestInterceptor<CustomHttpRequestInterceptor>()
                .AddDiagnosticEventListener<CustomDiagnosticEventListener>();

            gql
                .SetPagingOptions(new PagingOptions { MaxPageSize = 100, IncludeTotalCount = true })
                .ModifyRequestOptions(opts => {
                    opts.IncludeExceptionDetails = env == Environments.Development;
                });

            gql
                .RegisterService<IEmailSender>()
                .RegisterService<IBlobService>()
                .RegisterService<ISessionManager>()
                .RegisterService<ISMSService>()
                .RegisterService<UserManager<User>>()
                .RegisterService<SignInManager<User>>()
                .RegisterDbContext<ApplicationDbContext>(DbContextKind.Pooled);

            gql
                .AddTypeExtension<UserQueries>()
                .AddTypeExtension<UserMutations>()
                .AddDataLoader<UserByIdDataLoader>()
                .AddType<UserType>()
                .AddType<UserProfileColorType>()
                .AddType<UserPreferredProviderType>()
                .AddType<UserFilterInputType>();

            gql
                .AddTypeExtension<SessionQueries>()
                .AddDataLoader<SessionByIdDataLoader>()
                .AddType<SessionType>()
                .AddType<SessionFilterType>();

            gql
                .AddTypeExtension<ClassroomQueries>()
                .AddTypeExtension<ClassroomMutations>()
                .AddDataLoader<ClassroomByIdDataLoader>()
                .AddType<ClassroomType>();

            gql
                .AddDataLoader<ClassroomInviteByIdDataLoader>()
                .AddType<ClassroomInviteType>();

            gql
                .AddTypeExtension<ClassroomAnnouncementMutations>()
                .AddDataLoader<ClassroomAnnouncementByIdDataLoader>()
                .AddType<ClassroomAnnouncementType>();

            gql
                .AddDataLoader<ClassroomReminderByIdDataLoader>()
                .AddTypeExtension<ClassroomReminderMutations>()
                .AddType<ClassroomReminderImportanceType>()
                .AddType<ClassroomReminderType>();

            gql
                .AddDataLoader<ClassroomSyllabusByIdDataLoader>()
                .AddTypeExtension<ClassroomSyllabusMutations>()
                .AddType<ClassroomSyllabusType>();

            gql
                .AddDataLoader<ClassroomTimelineEventByIdDataLoader>()
                .AddType<ClassroomTimelineEventType>()
                .AddType<ClassroomTimelineEventItemType>();

            gql
                .AddTypeExtension<DiscussionQueries>()
                .AddTypeExtension<DiscussionMutations>()
                .AddTypeExtension<DiscussionSubscriptions>()
                .AddDataLoader<DiscussionByIdDataLoader>()
                .AddType<DiscussionType>()
                .AddType<DiscussionFilterInputType>();

            gql
                .AddDataLoader<MessageByIdDataLoader>()
                .AddType<MessageType>()
                .AddType<MessageEventType>();

            gql
                .AddTypeExtension<AuthMutations>();

            gql
                .AddTypeExtension<FileQueries>()
                .AddTypeExtension<FileMutations>()
                .AddDataLoader<FileByIdDataLoader>()
                .AddType<FileType>()
                .AddType<FileUploadStatusType>()
                .AddType<WhitelistedFileExtensionType>();

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
