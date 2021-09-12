using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class DelLogTypeConfiguration : IEntityTypeConfiguration<DelLogType> {
        public void Configure(EntityTypeBuilder<DelLogType> builder) {
            builder.HasKey(d => d.Id);

            builder.Property(d => d.Type).HasMaxLength(35);

            builder.HasMany(d => d.DelLogs)
                .WithOne(dl => dl.DeletedFor!)
                .HasForeignKey(d => d.DeletedForId);
        }
    }
}
