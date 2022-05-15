using System.Reflection;
using API.Data.Entities;
using API.Schema.Types.ClassroomReminders;
using API.Schema.Types.ClassroomTimelineEvents;
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
        public DbSet<UserEmailChange> UserEmailChanges { get; set; } = default!;
        public DbSet<UserPhoneNumberChange> UserPhoneNumberChanges { get; set; } = default!;
        public DbSet<UserPasswordReset> UserPasswordResets { get; set; } = default!;
        public DbSet<Session> Sessions { get; set; } = default!;
        public DbSet<Classroom> Classrooms { get; set; } = default!;
        public DbSet<ClassroomUser> ClassroomUsers { get; set; } = default!;
        public DbSet<ClassroomInvite> ClassroomInvites { get; set; } = default!;
        public DbSet<ClassroomInviteLog> ClassroomInviteLogs { get; set; } = default!;
        public DbSet<ClassroomAnnouncement> ClassroomAnnouncements { get; set; } = default!;
        public DbSet<ClassroomReminder> ClassroomReminders { get; set; } = default!;
        public DbSet<ClassroomSyllabus> ClassroomSyllabus { get; set; } = default!;
        public DbSet<ClassroomTimelineEvent> ClassroomTimelineEvents { get; set; } = default!;
        public DbSet<Discussion> Discussions { get; set; } = default!;
        public DbSet<Message> Messages { get; set; } = default!;
        public DbSet<File> Files { get; set; } = default!;
        public DbSet<MessageFile> MessageFiles { get; set; } = default!;
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
            builder.HasPostgresEnum<UserPreferredProvider>();
            builder.HasPostgresEnum<WhitelistedFileExtension>();
            builder.HasPostgresEnum<FileUploadStatus>();
            builder.HasPostgresEnum<ClassroomReminderImportance>();
            builder.HasPostgresEnum<ClassroomTimelineEventItem>();

            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }

        private static void MapEnums() {
            NpgsqlConnection.GlobalTypeMapper.MapEnum<MessageEvent>();
            NpgsqlConnection.GlobalTypeMapper.MapEnum<UserProfileColor>();
            NpgsqlConnection.GlobalTypeMapper.MapEnum<UserPreferredProvider>();
            NpgsqlConnection.GlobalTypeMapper.MapEnum<WhitelistedFileExtension>();
            NpgsqlConnection.GlobalTypeMapper.MapEnum<FileUploadStatus>();
            NpgsqlConnection.GlobalTypeMapper.MapEnum<ClassroomReminderImportance>();
            NpgsqlConnection.GlobalTypeMapper.MapEnum<ClassroomTimelineEventItem>();
        }
    }
}
