using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace API.Data.Configurations {
    public class ClassroomInviteConfiguration : IEntityTypeConfiguration<ClassroomInvite> {
        public void Configure(EntityTypeBuilder<ClassroomInvite> builder) {
            builder.HasKey(ci => new { ci.InviteId, ci.UserId, ci.ClassroomId });

            builder.Property(i => i.UpdatedAt)
                .HasDefaultValue(DateTime.UtcNow);

            builder.HasOne(ci => ci.User)
                .WithMany(u => u!.Invites)
                .HasForeignKey(ci => ci.UserId);

            builder.HasOne(ci => ci.Invite)
                .WithMany(i => i!.Logs)
                .HasForeignKey(ci => ci.InviteId);
            
            builder.HasOne(ci => ci.Classroom)
                .WithMany(c => c!.Invites)
                .HasForeignKey(ci => ci.ClassroomId);
        }
    }
}
