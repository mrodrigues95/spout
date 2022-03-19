using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class UserPasswordResetConfiguration : IEntityTypeConfiguration<UserPasswordReset> {
        public void Configure(EntityTypeBuilder<UserPasswordReset> builder) {
            builder.HasKey(u => u.Id);

            builder.Property(u => u.UserId)
                .IsRequired();

            builder.Property(u => u.Token)
                .IsRequired();

            builder.Property(u => u.TokenEncoded)
                .IsRequired();

            builder.Property(u => u.ExpiresAt)
                .IsRequired();

            builder.Property(u => u.CreatedAt)
                .HasDefaultValueSql("now()")
                .IsRequired();

            builder.Property(u => u.UpdatedAt)
                .HasDefaultValueSql("now()")
                .IsRequired();

            builder.HasIndex(u => u.Token);

            builder.HasIndex(u => new { u.Token, u.UserId })
                .IsUnique();

            builder.HasOne(u => u.User)
                .WithMany(x => x!.PasswordResets)
                .HasForeignKey(u => u.UserId);
        }
    }
}
