using API.Common.Enums;
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

            // TODO: Is it better to create an enum in postgres and use that?
            // See: https://www.npgsql.org/efcore/mapping/enum.html?tabs=tabid-1
            builder.Property(i => i.ExpiresAfter)
                .HasDefaultValue(ExpiresAfter.SevenDays)
                .HasConversion<string>()
                .HasMaxLength(13);

            builder.Property(i => i.IsValid)
                .HasDefaultValue(true);

            builder.Property(i => i.CreatedAt)
                .HasDefaultValue(DateTime.UtcNow);

            builder.Property(i => i.UpdatedAt)
                .HasDefaultValue(DateTime.UtcNow);

            builder
                .HasCheckConstraint("ck_positive_uses", "uses >= 0");

            builder
                .HasCheckConstraint("ck_positive_max_uses", "max_uses >= 0 AND max_uses <= 100");

            builder.HasOne(i => i.Inviter)
                .WithMany(u => u!.Invites)
                .HasForeignKey(i => i.InviterId);
            
            builder.HasOne(i => i.Classroom)
                .WithMany(c => c!.Invites)
                .HasForeignKey(i => i.ClassroomId);

            builder
                .HasIndex(i => i.Code)
                .IsUnique();

            builder
                .HasIndex(i => i.InviterId);

            builder
                .HasIndex(i => i.ClassroomId);

            builder
                .HasIndex(i => new { i.Code, i.InviterId, i.ClassroomId })
                .IsUnique();
        }
    }
}
