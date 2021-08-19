using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace API.Data.Configurations {
    public class UserConfiguration : IEntityTypeConfiguration<User> {
        public void Configure(EntityTypeBuilder<User> builder) {
            builder.HasKey(u => u.Id);

            builder.Property(u => u.Name)
                .HasMaxLength(70);

            builder.Property(u => u.Email)
                .HasMaxLength(256);

            builder.Property(u => u.CreatedAt)
                .HasDefaultValue(DateTime.UtcNow);

            builder.Property(u => u.UpdatedAt)
                .HasDefaultValue(DateTime.UtcNow);

            builder.HasMany(u => u.Classrooms)
                .WithOne(uc => uc.User!)
                .HasForeignKey(uc => uc.UserId);

            builder.HasMany(u => u.Sessions)
                .WithOne(s => s.User!)
                .HasForeignKey(s => s.UserId);

            builder.HasMany(u => u.Messages)
                .WithOne(m => m.CreatedBy!)
                .HasForeignKey(m => m.CreatedById);
            
            builder.HasMany(u => u.Invites)
                .WithOne(ui => ui.User!)
                .HasForeignKey(ui => ui.UserId);          

            builder.HasOne(u => u.State)
                .WithMany(s => s!.Users)
                .HasForeignKey(u => u.StateId);
        }
    }
}
