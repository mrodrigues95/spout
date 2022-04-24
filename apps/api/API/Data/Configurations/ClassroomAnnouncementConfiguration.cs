using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class ClassroomAnnouncementConfiguration
        : IEntityTypeConfiguration<ClassroomAnnouncement> {
        public void Configure(EntityTypeBuilder<ClassroomAnnouncement> builder) {
            builder
                .HasKey(ca => ca.Id);

            builder
                .Property(ca => ca.Guid)
                .IsRequired(true);

            builder
                .Property(ca => ca.Content)
                .HasMaxLength(12000)
                .IsRequired(true);

            builder
                .Property(ca => ca.UpdatedAt)
                .HasDefaultValueSql("now()");

            builder
                .Property(ca => ca.CreatedAt)
                .HasDefaultValueSql("now()");

            builder.HasOne(ca => ca.CreatedBy)
                .WithMany(u => u!.ClassroomAnnouncements)
                .HasForeignKey(ca => ca.CreatedById);

            builder.HasOne(ca => ca.Classroom)
                .WithMany(c => c!.Announcements)
                .HasForeignKey(ca => ca.ClassroomId);
        }
    }
}
