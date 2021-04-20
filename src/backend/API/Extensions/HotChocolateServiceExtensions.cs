using API.Schema.ApplicationUsers;
using API.Schema.Classrooms;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions {
    public static class HotChocolateServiceExtensions {
        public static IServiceCollection AddHotChocolateServices(this IServiceCollection services) {
            services
                .AddGraphQLServer()
                .AddQueryType()
                    .AddTypeExtension<ApplicationUserQueries>()
                    .AddTypeExtension<ClassroomQueries>()
                .AddMutationType()
                    .AddTypeExtension<ApplicationUserMutations>()
                    .AddTypeExtension<ClassroomMutations>()
                .AddType<ApplicationUserType>()
                .AddType<ClassroomType>()
                .EnableRelaySupport()
                .AddDataLoader<ApplicationUserByIdDataLoader>()
                .AddDataLoader<ClassroomByIdDataLoader>();

            return services;
        }
    }
}
