using API.Extensions;
using API.Middleware;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API {
    public class Startup {
        private readonly IConfiguration _config;

        public Startup(IConfiguration config) {
            _config = config;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {
            services.AddApplicationServices(_config);
            services.AddHotChocolateServices();
            services.AddIdentityServices();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app) {
            app
                .UseMiddleware<ExceptionHandlingMiddleware>()
                //.UseHttpsRedirection()
                .UseRouting()
                .UseWebSockets()
                .UseCors("CorsPolicy")
                .UseAuthentication()
                .UseAuthorization()
                // TODO: The schema can be downloaded without authentication.
                // We should look into securing this endpoint and using `.AllowIntrospection()`.
                .UseEndpoints(endpoints => endpoints.MapGraphQL("/api/graphql"));
        }
    }
}
