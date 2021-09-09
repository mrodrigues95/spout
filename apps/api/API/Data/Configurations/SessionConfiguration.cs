using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class SessionConfiguration : IEntityTypeConfiguration<Session> {
        public void Configure(EntityTypeBuilder<Session> builder) {
            builder.HasKey(s => s.Id);

            builder.Property(s => s.CreatedAt)
                .HasDefaultValueSql("timezone('UTC', now())");

            builder.Property(s => s.ExpiresAt)
                .HasDefaultValueSql("timezone('UTC', now() + INTERVAL '7 DAYS')");

            builder.Property(s => s.UpdatedAt)
                .HasDefaultValueSql("timezone('UTC', now())");

            builder.HasIndex(s => s.UserId);

            builder.HasOne(s => s.User)
                .WithMany(u => u!.Sessions)
                .HasForeignKey(s => s.UserId);
        }
    }
}
