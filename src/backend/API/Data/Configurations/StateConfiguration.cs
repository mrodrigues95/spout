using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class StateConfiguration : IEntityTypeConfiguration<State> {
        public void Configure(EntityTypeBuilder<State> builder) {
            builder.HasKey(s => s.Id);

            builder.Property(s => s.Status)
                .HasMaxLength(35);

            builder.Property(s => s.CreatedAt)
                .HasDefaultValueSql("timezone('UTC', now())");

            builder.Property(s => s.UpdatedAt)
                .HasDefaultValueSql("timezone('UTC', now())");

            builder.HasMany(s => s.Users)
                .WithOne(u => u.State!)
                .HasForeignKey(u => u.StateId);
        }
    }
}
