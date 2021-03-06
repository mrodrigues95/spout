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

            builder.Property(c => c.IsDeleted)
                .HasDefaultValue(false)
                .IsRequired();

            builder.Property(c => c.DeletedAt)
                .IsRequired(false);

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
                .WithOne(ci => ci.Classroom!)
                .HasForeignKey(ci => ci.ClassroomId);

            builder.HasMany(c => c.Announcements)
                .WithOne(ca => ca.Classroom!)
                .HasForeignKey(ca => ca.ClassroomId);

            builder.HasMany(c => c.Reminders)
                .WithOne(cr => cr.Classroom!)
                .HasForeignKey(cr => cr.ClassroomId);

            builder.HasMany(c => c.Timeline)
                .WithOne(x => x.Classroom!)
                .HasForeignKey(x => x.ClassroomId);

            builder.HasOne(c => c.Syllabus)
                .WithOne(cs => cs.Classroom)
                .HasForeignKey<ClassroomSyllabus>(cs => cs.ClassroomId);
        }
    }
}
