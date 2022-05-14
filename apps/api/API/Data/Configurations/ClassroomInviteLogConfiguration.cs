using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class ClassroomInviteLogConfiguration : IEntityTypeConfiguration<ClassroomInviteLog> {
        public void Configure(EntityTypeBuilder<ClassroomInviteLog> builder) {
            builder.HasKey(cil => cil.Id);

            builder
                .Property(cil => cil.Guid)
                .IsRequired(true);

            builder
                .Property(cil => cil.UsedAt)
                .HasDefaultValueSql("now()")
                .IsRequired(true);

            builder
                .Property(cil => cil.CreatedAt)
                .HasDefaultValueSql("now()")
                .IsRequired(true); ;

            builder
                .Property(cil => cil.UpdatedAt)
                .HasDefaultValueSql("now()")
                .IsRequired(true);

            builder.HasOne(cil => cil.ClassroomInvite)
                .WithMany(ci => ci!.Logs)
                .HasForeignKey(cil => cil.ClassroomInviteId);

            builder.HasOne(cil => cil.UsedBy)
                .WithMany(u => u!.ClassroomInviteLogs)
                .HasForeignKey(cil => cil.UsedById);
        }
    }
}
