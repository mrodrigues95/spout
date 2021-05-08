using API.Common.Exceptions;
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

            services
                .AddHttpResultSerializer<GraphQLHttpResultSerializer>()
                .AddGraphQLServer()
                .AddQueryType()
                    .AddTypeExtension<UserQueries>()
                    .AddTypeExtension<SessionQueries>()
                    .AddTypeExtension<ClassroomQueries>()
                    .AddTypeExtension<AuthQueries>()
                .AddMutationType()
                    .AddTypeExtension<ClassroomMutations>()
                    .AddTypeExtension<AuthMutations>()
                .AddType<UserType>()
                .AddType<SessionType>()
                .AddType<ClassroomType>()
                .EnableRelaySupport()
                .AddDataLoader<UserByIdDataLoader>()
                .AddDataLoader<SessionByIdDataLoader>()
                .AddDataLoader<ClassroomByIdDataLoader>()
                //.AddAuthorization()
                .AddFluentValidation()
                .AddErrorFilter<ErrorFilter>()
                .ModifyRequestOptions(opt => {
                    opt.IncludeExceptionDetails = env == Environments.Development;
                });

            return services;
        }
    }
}
