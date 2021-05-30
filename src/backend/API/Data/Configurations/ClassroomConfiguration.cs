using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class ClassroomConfiguration : IEntityTypeConfiguration<Classroom> {
        public void Configure(EntityTypeBuilder<Classroom> builder) {
            builder.HasKey(x => x.Id);

            builder.Property(c => c.Guid).IsRequired();

            builder.Property(c => c.Name).HasMaxLength(35).IsRequired();

            builder.Property(c => c.CreatedAt).IsRequired();

            builder.Property(c => c.UpdatedAt).IsRequired();

            builder.Property(c => c.IsActive).IsRequired();

            builder.Property(c => c.CreatedById).IsRequired();

            builder.HasIndex(c => c.CreatedById);

            builder.HasMany(c => c.Discussions)
                .WithOne(c => c.Classroom!)
                .HasForeignKey(c => c.ClassroomId)
                .IsRequired();
        }
    }
}
