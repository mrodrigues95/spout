using API.Schema.Entities.Classroom;
using API.Schema.Entities.Session;
using API.Schema.Entities.User;
using API.Schema.Services.Auth;
using AppAny.HotChocolate.FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;

namespace API.Extensions {
    public static class HotChocolateServiceExtensions {
        public static IServiceCollection AddHotChocolateServices(this IServiceCollection services) {
            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            var gql = services.AddGraphQLServer();
            gql
                .AddAuthorization()
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
                    .AddTypeExtension<AuthQueries>();

            gql
                .AddMutationType()
                    .AddTypeExtension<ClassroomMutations>()
                    .AddTypeExtension<AuthMutations>();

            gql
                .AddType<UserType>()
                .AddType<SessionType>()
                .AddType<ClassroomType>();

            gql
                .AddDataLoader<UserByIdDataLoader>()
                .AddDataLoader<SessionByIdDataLoader>()
                .AddDataLoader<ClassroomByIdDataLoader>();

            return services;
        }
    }
}
