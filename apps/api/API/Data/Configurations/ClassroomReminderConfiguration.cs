using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class ClassroomReminderConfiguration
        : IEntityTypeConfiguration<ClassroomReminder> {
        public void Configure(EntityTypeBuilder<ClassroomReminder> builder) {
            builder
                .HasKey(cr => cr.Id);

            builder
                .Property(cr => cr.Guid)
                .IsRequired(true);

            builder
                .Property(cr => cr.Title)
                .HasMaxLength(128)
                .IsRequired(true);

            builder
                .Property(cr => cr.Description)
                .HasMaxLength(256)
                .IsRequired(false);

            builder
                .Property(cr => cr.Importance)
                .IsRequired(true);

            builder
                .Property(cr => cr.DueAt)
                .IsRequired(true);

            builder
                .Property(cr => cr.UpdatedAt)
                .HasDefaultValueSql("now()");

            builder
                .Property(cr => cr.CreatedAt)
                .HasDefaultValueSql("now()");

            builder.HasOne(cr => cr.CreatedBy)
                .WithMany(u => u!.ClassroomReminders)
                .HasForeignKey(cr => cr.CreatedById);

            builder.HasOne(cr => cr.Classroom)
                .WithMany(c => c!.Reminders)
                .HasForeignKey(cr => cr.ClassroomId);
        }
    }
}
