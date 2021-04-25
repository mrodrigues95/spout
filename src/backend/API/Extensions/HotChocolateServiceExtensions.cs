using API.Schema.Entities.Classroom;
using API.Schema.Entities.User;
using API.Schema.Services.Auth;
using AppAny.HotChocolate.FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions {
    public static class HotChocolateServiceExtensions {
        public static IServiceCollection AddHotChocolateServices(this IServiceCollection services) {
            services
                .AddGraphQLServer()
                .AddQueryType()
                    .AddTypeExtension<UserQueries>()
                    .AddTypeExtension<ClassroomQueries>()
                .AddMutationType()
                    .AddTypeExtension<ClassroomMutations>()
                    .AddTypeExtension<AuthMutations>()
                .AddType<UserType>()
                .AddType<ClassroomType>()
                .EnableRelaySupport()
                .AddDataLoader<UserByIdDataLoader>()
                .AddDataLoader<ClassroomByIdDataLoader>()
                .AddAuthorization()
                .AddFairyBread();

            return services;
        }
    }
}
