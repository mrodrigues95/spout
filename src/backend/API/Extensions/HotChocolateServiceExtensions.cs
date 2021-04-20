using API.Schema.Classrooms;
using API.Schema.Users;
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
                    .AddTypeExtension<UserMutations>()
                    .AddTypeExtension<ClassroomMutations>()
                .AddType<UserType>()
                .AddType<ClassroomType>()
                .EnableRelaySupport()
                .AddDataLoader<UserByIdDataLoader>()
                .AddDataLoader<ClassroomByIdDataLoader>();

            return services;
        }
    }
}
