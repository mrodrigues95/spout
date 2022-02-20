using System.Reflection;
using API.Data.Entities;
using API.Schema.Types.Files;
using API.Schema.Types.Messages;
using API.Schema.Types.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace API.Data {
    public class ApplicationDbContext : IdentityDbContext<User, IdentityRole<int>, int> {
        static ApplicationDbContext() {
            MapEnums();
        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public override DbSet<User> Users { get; set; } = default!;
        public DbSet<Session> Sessions { get; set; } = default!;
        public DbSet<Classroom> Classrooms { get; set; } = default!;
        public DbSet<ClassroomUser> ClassroomUsers { get; set; } = default!;
        public DbSet<ClassroomInvite> ClassroomInvites { get; set; } = default!;
        public DbSet<Discussion> Discussions { get; set; } = default!;
        public DbSet<Message> Messages { get; set; } = default!;
        public DbSet<File> Files { get; set; } = default!;
        public DbSet<MessageFile> MessageFiles { get; set; } = default!;
        public DbSet<Invite> Invites { get; set; } = default!;
        public DbSet<State> States { get; set; } = default!;
        public DbSet<DelLogType> DelLogTypes { get; set; } = default!;
        public DbSet<DelLog> DelLogs { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder builder) {
            base.OnModelCreating(builder);

            // Configure the default ASP.NET table names.
            builder.Entity<User>().ToTable("users");
            builder.Entity<IdentityUserLogin<int>>().ToTable("user_logins");
            builder.Entity<IdentityUserToken<int>>().ToTable("users_tokens");
            builder.Entity<IdentityUserClaim<int>>().ToTable("user_claims");
            builder.Entity<IdentityUserRole<int>>().ToTable("user_roles");
            builder.Entity<IdentityRoleClaim<int>>().ToTable("role_claims");
            builder.Entity<IdentityRole<int>>().ToTable("roles");

            // Configure enums.
            builder.HasPostgresEnum<MessageEvent>();
            builder.HasPostgresEnum<UserProfileColor>();
            builder.HasPostgresEnum<WhitelistedFileExtension>();
            builder.HasPostgresEnum<FileUploadStatus>();

            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }

        private static void MapEnums() {
            NpgsqlConnection.GlobalTypeMapper.MapEnum<MessageEvent>();
            NpgsqlConnection.GlobalTypeMapper.MapEnum<UserProfileColor>();
            NpgsqlConnection.GlobalTypeMapper.MapEnum<WhitelistedFileExtension>();
            NpgsqlConnection.GlobalTypeMapper.MapEnum<FileUploadStatus>();
        }
    }
}
