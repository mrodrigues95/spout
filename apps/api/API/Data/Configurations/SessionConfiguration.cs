using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class SessionConfiguration : IEntityTypeConfiguration<Session> {
        public void Configure(EntityTypeBuilder<Session> builder) {
            builder.HasKey(s => s.Id);

            builder.Property(u => u.Guid)
                .IsRequired();

            builder.Property(s => s.UserId)
                .IsRequired();

            builder.Property(s => s.CreatedAt)
                .HasDefaultValueSql("now()")
                .IsRequired();

            builder.Property(s => s.ExpiresAt)
                .HasDefaultValueSql("now() + INTERVAL '7 DAYS'")
                .IsRequired();

            builder.Property(s => s.UpdatedAt)
                .HasDefaultValueSql("now()")
                .IsRequired();

            builder.HasIndex(s => s.UserId);

            builder.HasOne(s => s.User)
                .WithMany(u => u!.Sessions)
                .HasForeignKey(s => s.UserId);
        }
    }
}
