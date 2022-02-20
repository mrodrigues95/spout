using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class DelLogConfiguration : IEntityTypeConfiguration<DelLog> {
        public void Configure(EntityTypeBuilder<DelLog> builder) {
            builder.HasKey(d => d.Id);

            builder.Property(d => d.CreatedAt)
                .HasDefaultValueSql("timezone('UTC', now())");

            builder.Property(d => d.UpdatedAt)
                .HasDefaultValueSql("timezone('UTC', now())");

            builder.HasOne(d => d.DeletedFor)
                .WithMany(dlt => dlt!.DelLogs)
                .HasForeignKey(d => d.DeletedForId);
        }
    }
}
