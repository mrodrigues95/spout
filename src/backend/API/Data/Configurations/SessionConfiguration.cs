using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace API.Data.Configurations {
    public class SessionConfiguration : IEntityTypeConfiguration<Session> {
        public void Configure(EntityTypeBuilder<Session> builder) {
            builder.HasKey(s => s.Id);

            builder.Property(s => s.CreatedAt)
                .HasDefaultValue(DateTime.UtcNow)
                .IsRequired();

            builder.Property(s => s.ExpiresAt)
                .HasDefaultValue(DateTime.UtcNow)
                .IsRequired();

            builder.Property(s => s.UpdatedAt)
                .HasDefaultValue(DateTime.UtcNow)
                .IsRequired();

            builder.Property(s => s.UserId).IsRequired();

            builder.HasIndex(s => s.UserId);

            builder.HasOne(s => s.User)
                .WithMany(u => u!.Sessions)
                .HasForeignKey(s => s.UserId)
                .IsRequired();
        }
    }
}
