using API.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace API.Data {
    public class ApplicationDbContext : IdentityDbContext<User, IdentityRole<int>, int> {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public override DbSet<User> Users { get; set; } = default!;
        public DbSet<Session> Sessions { get; set; } = default!;
        public DbSet<Classroom> Classrooms { get; set; } = default!;
        public DbSet<UserClassroom> UserClassrooms { get; set; } = default!;
        public DbSet<Discussion> Discussions { get; set; } = default!;
        public DbSet<Message> Messages { get; set; } = default!;
        public DbSet<State> States { get; set; } = default!;
        public DbSet<DelLogType> DelLogTypes { get; set; } = default!;
        public DbSet<DelLog> DelLogs { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder builder) {
            base.OnModelCreating(builder);

            // Configure default ASP.NET table names.
            builder.Entity<User>().ToTable("users");
            builder.Entity<IdentityUserLogin<int>>().ToTable("user_logins");
            builder.Entity<IdentityUserToken<int>>().ToTable("users_tokens");
            builder.Entity<IdentityUserClaim<int>>().ToTable("user_claims");
            builder.Entity<IdentityUserRole<int>>().ToTable("user_roles");
            builder.Entity<IdentityRoleClaim<int>>().ToTable("role_claims");
            builder.Entity<IdentityRole<int>>().ToTable("roles");

            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
