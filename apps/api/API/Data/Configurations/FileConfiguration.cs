using API.Data.Entities;
using API.Schema.Types.Files;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class FileConfiguration : IEntityTypeConfiguration<File> {
        public void Configure(EntityTypeBuilder<File> builder) {
            builder.HasKey(f => f.Id);

            builder.Property(f => f.ContentLength)
                .HasMaxLength((int)FileSize._8MB);

            builder.Property(f => f.UploadStatus)
                .HasMaxLength(255);

            builder.Property(f => f.Sas)
                .HasColumnType("text");

            builder.Property(f => f.BlobName)
                .HasMaxLength(1024);

            builder.Property(f => f.Location)
                .IsRequired(false);

            builder.Property(f => f.ETag)
                .IsRequired(false);

            builder.Property(f => f.MD5)
                .IsRequired(false);

            builder.Property(f => f.IsDeleted)
                .HasDefaultValue(false);

            builder.Property(f => f.CreatedAt)
                .HasDefaultValueSql("timezone('UTC', now())");

            builder.Property(f => f.UpdatedAt)
                .HasDefaultValueSql("timezone('UTC', now())");

            builder.Property(f => f.DeletedAt)
                .IsRequired(false);

            builder.HasMany(f => f.MessageFiles)
                .WithOne(mf => mf.File!)
                .HasForeignKey(mf => mf.FileId);

            builder.HasOne(f => f.UploadedBy)
                .WithMany(u => u!.FileUploads)
                .HasForeignKey(f => f.UploadedById);

            builder
                .HasIndex(f => new { f.BlobName, f.ContainerName })
                .IsUnique();

            builder.HasCheckConstraint("ck_content_length", "content_length > 0");

            builder.HasCheckConstraint("ck_container_name",
                "length(container_name) >= 3 AND length(container_name) <= 63");
        }
    }
}
