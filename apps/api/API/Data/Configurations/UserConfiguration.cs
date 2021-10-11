using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class UserConfiguration : IEntityTypeConfiguration<User> {
        public void Configure(EntityTypeBuilder<User> builder) {
            builder.HasKey(u => u.Id);

            builder.Property(u => u.Name)
                .HasMaxLength(70);

            builder.Property(u => u.Email)
                .HasMaxLength(256);

            builder.Property(u => u.AvatarUrl)
                .HasMaxLength(2048)
                .IsRequired(false);

            builder.Property(u => u.CreatedAt)
                .HasDefaultValueSql("timezone('UTC', now())");

            builder.Property(u => u.UpdatedAt)
                .HasDefaultValueSql("timezone('UTC', now())");

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

            builder.HasMany(u => u.FileUploads)
                .WithOne(f => f.UploadedBy!)
                .HasForeignKey(f => f.UploadedById);          

            builder.HasOne(u => u.State)
                .WithMany(s => s!.Users)
                .HasForeignKey(u => u.StateId);
        }
    }
}
