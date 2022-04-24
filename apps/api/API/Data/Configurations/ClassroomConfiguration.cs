using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class ClassroomConfiguration : IEntityTypeConfiguration<Classroom> {
        public void Configure(EntityTypeBuilder<Classroom> builder) {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Guid)
                .IsRequired();

            builder.Property(c => c.Name)
                .HasMaxLength(64)
                .IsRequired();

            builder.Property(c => c.StateId)
                .IsRequired();

            builder.Property(c => c.CreatedAt)
                .HasDefaultValueSql("now()")
                .IsRequired();

            builder
                .Property(c => c.UpdatedAt)
                .HasDefaultValueSql("now()")
                .IsRequired();

            builder.HasMany(c => c.Users)
                .WithOne(uc => uc.Classroom!)
                .HasForeignKey(uc => uc.ClassroomId);

            builder.HasMany(c => c.Discussions)
                .WithOne(d => d.Classroom!)
                .HasForeignKey(c => c.ClassroomId);

            builder.HasMany(c => c.Invites)
                .WithOne(ui => ui.Classroom!)
                .HasForeignKey(ui => ui.ClassroomId);

            builder.HasMany(c => c.Announcements)
                .WithOne(ca => ca.Classroom!)
                .HasForeignKey(ca => ca.ClassroomId);

            builder.HasMany(c => c.Reminders)
                .WithOne(cr => cr.Classroom!)
                .HasForeignKey(cr => cr.ClassroomId);

            builder.HasOne(c => c.DelLog)
                .WithMany(d => d!.DeletedClassrooms)
                .HasForeignKey(c => c.DelLogId);

            builder.HasOne(c => c.State)
                .WithMany(s => s!.Classrooms)
                .HasForeignKey(c => c.StateId);

            builder.HasOne(c => c.Syllabus)
                .WithOne(cs => cs.Classroom)
                .HasForeignKey<ClassroomSyllabus>(cs => cs.ClassroomId);
        }
    }
}
