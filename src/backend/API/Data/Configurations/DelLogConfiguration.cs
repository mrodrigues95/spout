using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace API.Data.Configurations {
    public class DelLogConfiguration : IEntityTypeConfiguration<DelLog> {
        public void Configure(EntityTypeBuilder<DelLog> builder) {
            builder.HasKey(d => d.Id);

            builder.Property(d => d.CreatedAt)
                .HasDefaultValue(DateTime.UtcNow);

            builder.Property(d => d.UpdatedAt)
                .HasDefaultValue(DateTime.UtcNow);

            builder.HasOne(d => d.DeletedFor)
                .WithMany(dlt => dlt!.DelLogs)
                .HasForeignKey(d => d.DeletedForId);
        }
    }
}
