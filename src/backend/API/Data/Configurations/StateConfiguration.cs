using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace API.Data.Configurations {
    public class StateConfiguration : IEntityTypeConfiguration<State> {
        public void Configure(EntityTypeBuilder<State> builder) {
            builder.HasKey(s => s.Id);

            builder.Property(s => s.Status)
                .HasMaxLength(35);

            builder.Property(s => s.CreatedAt)
                .HasDefaultValue(DateTime.UtcNow);

            builder.Property(s => s.UpdatedAt)
                .HasDefaultValue(DateTime.UtcNow);

            builder.HasMany(s => s.Users)
                .WithOne(u => u.State!)
                .HasForeignKey(u => u.StateId);
        }
    }
}
