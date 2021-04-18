using API.Data;
using API.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
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
            services.AddGraphQLServices();
            services.AddIdentityServices(Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            app.UseRouting();

            app.UseEndpoints(endpoints => {
                endpoints.MapGraphQL();
            });
        }
    }
}
