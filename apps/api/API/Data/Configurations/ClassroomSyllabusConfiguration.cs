using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class ClassroomSyllabusConfiguration : IEntityTypeConfiguration<ClassroomSyllabus> {
        public void Configure(EntityTypeBuilder<ClassroomSyllabus> builder) {
            builder
                .HasKey(cs => cs.Id);

            builder
                .Property(cs => cs.Guid)
                .IsRequired(true);

            builder
                .Property(cs => cs.Content)
                .HasMaxLength(12000)
                .IsRequired(true);

            builder
                .Property(cs => cs.UpdatedAt)
                .HasDefaultValueSql("now()");

            builder
                .Property(cs => cs.CreatedAt)
                .HasDefaultValueSql("now()");

            builder.HasMany(cs => cs.ClassroomTimelineEvents)
                .WithOne(x => x.ClassroomSyllabus!)
                .HasForeignKey(x => x.DiscussionId);

            builder.HasMany(cs => cs.Files)
                .WithOne(csf => csf.ClassroomSyllabus!)
                .HasForeignKey(csf => csf.ClassroomSyllabusId);
        }
    }
}
