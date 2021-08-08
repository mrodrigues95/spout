using API.Data;
using API.Extensions;
using API.Middleware;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API {
    public class Startup {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {
            services.AddPooledDbContextFactory<ApplicationDbContext>(opt => {
                opt.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"));
                opt.UseSnakeCaseNamingConvention();
            });
            services.AddScoped(p =>
                p.GetRequiredService<IDbContextFactory<ApplicationDbContext>>()
                    .CreateDbContext());
            services.AddControllers()
                .AddFluentValidation(cfg => {
                cfg.RegisterValidatorsFromAssemblyContaining<Startup>();
            });
            services.AddApplicationServices();
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
                .UseEndpoints(endpoints => endpoints.MapGraphQL("/api/graphql"));
        }
    }
}
