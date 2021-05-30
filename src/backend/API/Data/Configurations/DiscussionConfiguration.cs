using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class DiscussionConfiguration : IEntityTypeConfiguration<Discussion> {
        public void Configure(EntityTypeBuilder<Discussion> builder) {
            builder.HasKey(d => d.Id);

            builder.Property(d => d.Guid).IsRequired();

            builder.Property(d => d.Name).HasMaxLength(35).IsRequired();

            builder.Property(d => d.CreatedAt).IsRequired();

            builder.Property(d => d.UpdatedAt).IsRequired();

            builder.Property(d => d.ClassroomId).IsRequired();

            builder.Property(d => d.CreatedById).IsRequired();

            builder.HasIndex(d => new { d.CreatedById, d.ClassroomId });

            builder.HasOne(d => d.Classroom)
                .WithMany(c => c!.Discussions)
                .HasForeignKey(d => d.ClassroomId)
                .IsRequired();

            builder.HasOne(d => d.CreatedBy)
                .WithMany(u => u!.Discussions)
                .HasForeignKey(d => d.CreatedById)
                .IsRequired();

            builder.HasMany(d => d.Messages)
                .WithOne(m => m.Discussion!)
                .HasForeignKey(m => m.DiscussionId)
                .IsRequired();
        }
    }
}
