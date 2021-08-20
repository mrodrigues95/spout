using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace API.Data.Configurations {
    public class InviteConfiguration : IEntityTypeConfiguration<Invite> {
        public void Configure(EntityTypeBuilder<Invite> builder) {
            builder.HasKey(i => i.Id);

            builder.Property(i => i.Code)
                .HasMaxLength(22);
            
            builder.Property(i => i.Uses)
                .HasDefaultValue(0);
            
            builder.Property(i => i.MaxUses)
                .IsRequired(false)
                .HasDefaultValue(null);

            builder.Property(i => i.ExpiresAt)
                .IsRequired(false)
                .HasDefaultValue((DateTime.UtcNow).AddDays(7));

            builder.Property(i => i.CreatedAt)
                .HasDefaultValue(DateTime.UtcNow);

            builder.Property(i => i.UpdatedAt)
                .HasDefaultValue(DateTime.UtcNow);

            builder.HasMany(i => i.Logs)
                .WithOne(ui => ui.Invite!)
                .HasForeignKey(ui => ui.InviteId);

            builder.HasIndex(i => i.Code)
                .IsUnique();

            builder.HasCheckConstraint("ck_positive_uses", "uses >= 0");

            builder.HasCheckConstraint("ck_positive_max_uses", "max_uses >= 0 AND max_uses <= 100");

        }
    }
}
