using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class UserEmailChangeConfiguration : IEntityTypeConfiguration<UserEmailChange> {
        public void Configure(EntityTypeBuilder<UserEmailChange> builder) {
            builder.HasKey(u => u.Id);

            builder.Property(u => u.Token)
                .IsRequired();

            builder.Property(u => u.TokenEncoded)
                .IsRequired();

            builder.Property(u => u.NewEmail)
                .HasMaxLength(256)
                .IsRequired();

            builder.Property(u => u.UserId)
                .IsRequired();

            builder.Property(u => u.ExpiresAt)
                .IsRequired();

            builder.Property(u => u.CreatedAt)
                .HasDefaultValueSql("timezone('UTC', now())")
                .IsRequired();

            builder.Property(u => u.UpdatedAt)
                .HasDefaultValueSql("timezone('UTC', now())")
                .IsRequired();

            builder.HasIndex(u => new { u.Token, u.UserId })
                .IsUnique();

            builder.HasOne(u => u.User)
                .WithMany(x => x!.EmailChanges)
                .HasForeignKey(u => u.UserId);
        }
    }
}
