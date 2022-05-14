using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class ClassroomInviteConfiguration : IEntityTypeConfiguration<ClassroomInvite> {
        public void Configure(EntityTypeBuilder<ClassroomInvite> builder) {
            builder.HasKey(ci => ci.Id);

            builder
                .Property(ci => ci.Guid)
                .IsRequired(true);

            builder
                .Property(ci => ci.Code)
                .HasMaxLength(22)
                .IsRequired(true);

            builder
                .Property(ci => ci.TotalUses)
                .HasDefaultValue(0)
                .IsRequired(true);

            builder
                .Property(ci => ci.MaxUses)
                .IsRequired(false)
                .HasDefaultValue(null);

            builder
                .Property(ci => ci.MaxAge)
                .IsRequired(false)
                .HasDefaultValue(null);

            builder
                .Property(ci => ci.ExpiresAt)
                .IsRequired(false)
                .HasDefaultValueSql(null);

            builder
                .Property(ci => ci.CreatedAt)
                .HasDefaultValueSql("now()")
                .IsRequired(true);

            builder
                .Property(ci => ci.UpdatedAt)
                .HasDefaultValueSql("now()")
                .IsRequired(true);

            builder
                .HasMany(ci => ci.Logs)
                .WithOne(cil => cil.ClassroomInvite!)
                .HasForeignKey(cil => cil.ClassroomInviteId);

            builder.HasOne(ci => ci.CreatedBy)
                .WithMany(u => u!.ClassroomInvites)
                .HasForeignKey(ci => ci.CreatedById);

            builder.HasOne(ci => ci.Classroom)
                .WithMany(c => c!.Invites)
                .HasForeignKey(ci => ci.ClassroomId);

            builder
                .HasIndex(i => i.Code)
                .IsUnique();
        }
    }
}
