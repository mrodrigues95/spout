using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class UserPhoneNumberChangeConfiguration
            : IEntityTypeConfiguration<UserPhoneNumberChange> {
        public void Configure(EntityTypeBuilder<UserPhoneNumberChange> builder) {
            builder.HasKey(u => u.Id);

            builder.Property(u => u.Token)
                .IsRequired();

            builder.Property(u => u.NewPhoneNumber)
                .IsRequired();

            builder.Property(u => u.UserId)
                .IsRequired();

            builder.Property(u => u.ExpiresAt)
                .IsRequired();

            builder.Property(u => u.CreatedAt)
                .HasDefaultValueSql("now()")
                .IsRequired();

            builder.Property(u => u.UpdatedAt)
                .HasDefaultValueSql("now()")
                .IsRequired();

            builder.HasIndex(u => new { u.Token, u.UserId });

            builder.HasOne(u => u.User)
                .WithMany(x => x!.PhoneNumberChanges)
                .HasForeignKey(u => u.UserId);
        }
    }
}
