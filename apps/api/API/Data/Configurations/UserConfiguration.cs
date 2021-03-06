using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class UserConfiguration : IEntityTypeConfiguration<User> {
        public void Configure(EntityTypeBuilder<User> builder) {
            builder.HasKey(u => u.Id);

            builder.Property(u => u.Guid)
                .IsRequired();

            builder.Property(u => u.Name)
                .HasMaxLength(70)
                .IsRequired();

            builder.Property(u => u.Email)
                .HasMaxLength(256)
                .IsRequired();

            builder.Property(u => u.Bio)
                .HasMaxLength(190)
                .IsRequired(false);

            builder.Property(u => u.ProfileColor)
                .IsRequired();

            builder.Property(u => u.PreferredProvider)
                .IsRequired(false);

            builder.Property(u => u.AvatarUrl)
                .HasMaxLength(2048)
                .IsRequired(false);

            builder.Property(u => u.TwoFactorEnabledAt)
                .IsRequired(false);

            builder.Property(u => u.CreatedAt)
                .HasDefaultValueSql("now()")
                .IsRequired();

            builder.Property(u => u.UpdatedAt)
                .HasDefaultValueSql("now()")
                .IsRequired();

            builder.HasMany(u => u.EmailChanges)
                .WithOne(uec => uec.User!)
                .HasForeignKey(uec => uec.UserId);

            builder.HasMany(u => u.Classrooms)
                .WithOne(uc => uc.User!)
                .HasForeignKey(uc => uc.UserId);

            builder.HasMany(u => u.ClassroomAnnouncements)
                .WithOne(ca => ca.CreatedBy!)
                .HasForeignKey(ca => ca.CreatedById);

            builder.HasMany(u => u.ClassroomReminders)
                .WithOne(cr => cr.CreatedBy!)
                .HasForeignKey(cr => cr.CreatedById);

            builder.HasMany(u => u.ClassroomTimelineEvents)
                .WithOne(x => x.TriggeredBy!)
                .HasForeignKey(x => x.TriggeredById);

            builder.HasMany(u => u.Sessions)
                .WithOne(s => s.User!)
                .HasForeignKey(s => s.UserId);

            builder.HasMany(u => u.Messages)
                .WithOne(m => m.CreatedBy!)
                .HasForeignKey(m => m.CreatedById);

            builder.HasMany(u => u.PinnedMessages)
                .WithOne(m => m.PinnedBy!)
                .HasForeignKey(m => m.PinnedById);

            builder.HasMany(u => u.ClassroomInvites)
                .WithOne(ci => ci.CreatedBy!)
                .HasForeignKey(ci => ci.CreatedById);

            builder.HasMany(u => u.ClassroomInviteLogs)
                .WithOne(cil => cil.UsedBy!)
                .HasForeignKey(cil => cil.UsedById);

            builder.HasMany(u => u.FileUploads)
                .WithOne(f => f.UploadedBy!)
                .HasForeignKey(f => f.UploadedById);
        }
    }
}
