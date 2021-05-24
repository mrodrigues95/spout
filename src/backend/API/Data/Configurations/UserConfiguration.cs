using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class UserConfiguration : IEntityTypeConfiguration<User> {
        public void Configure(EntityTypeBuilder<User> builder) {
            builder.HasKey(u => u.Id);

            builder.Property(u => u.Guid).IsRequired();

            builder.Property(u => u.Name).HasMaxLength(70).IsRequired();

            builder.Property(u => u.Email).HasMaxLength(256).IsRequired();

            builder.Property(u => u.CreatedAt).IsRequired();

            builder.Property(u => u.UpdatedAt).IsRequired();

            builder.HasMany(u => u.Sessions)
                .WithOne(s => s.User!)
                .HasForeignKey(s => s.UserId)
                .IsRequired();
        }
    }
}
