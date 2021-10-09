using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class FileUploadConfiguration : IEntityTypeConfiguration<FileUpload> {
        public void Configure(EntityTypeBuilder<FileUpload> builder) {
            builder.HasKey(f => f.Id);

            builder.Property(f => f.Url)
                .HasMaxLength(2048);

            builder.Property(f => f.Location)
                .HasMaxLength(2048);

            builder.Property(f => f.UploadedAt)
                .HasDefaultValueSql("timezone('UTC', now())");

            builder.Property(f => f.UpdatedAt)
                .HasDefaultValueSql("timezone('UTC', now())");

            builder.HasOne(f => f.UploadedBy)
                .WithMany(u => u!.FileUploads)
                .HasForeignKey(f => f.UploadedById);
        }
    }
}
