using API.GraphQL.ApplicationUsers;
using API.GraphQL.Classrooms;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions {
    public static class GraphQLServiceExtensions {
        public static IServiceCollection AddGraphQLServices(this IServiceCollection services) {
            services
                .AddGraphQLServer()
                .AddQueryType(x => x.Name("Query"))
                    .AddTypeExtension<ApplicationUserQueries>()
                    .AddTypeExtension<ClassroomQueries>()
                .AddMutationType(x => x.Name("Mutation"))
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
