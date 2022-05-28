using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class ClassroomSyllabusFileConfiguration
        : IEntityTypeConfiguration<ClassroomSyllabusFile> {
        public void Configure(EntityTypeBuilder<ClassroomSyllabusFile> builder) {
            builder.HasKey(csf => new { csf.ClassroomSyllabusId, csf.FileId });

            builder.Property(csf => csf.CreatedAt)
                .HasDefaultValueSql("now()");

            builder.Property(csf => csf.UpdatedAt)
                .HasDefaultValueSql("now()");

            builder.HasOne(csf => csf.ClassroomSyllabus)
                .WithMany(cs => cs!.Files)
                .HasForeignKey(csf => csf.ClassroomSyllabusId);

            builder.HasOne(csf => csf.File)
                .WithMany(f => f!.ClassroomSyllabusFiles)
                .HasForeignKey(csf => csf.FileId);
        }
    }
}
