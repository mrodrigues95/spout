using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class InviteLogConfiguration : IEntityTypeConfiguration<InviteLog> {
        public void Configure(EntityTypeBuilder<InviteLog> builder) {
            builder.HasKey(il => new { il.InviteId, il.UserId });

            builder.Property(il => il.IsInviter)
                .HasDefaultValue(false);

            builder.HasOne(il => il.Invite)
                .WithMany(i => i!.InviteLogs)
                .HasForeignKey(il => il.InviteId);
            
            builder.HasOne(il => il.User)
                .WithMany(u => u!.InviteLogs)
                .HasForeignKey(il => il.UserId);
        }
    }
}
