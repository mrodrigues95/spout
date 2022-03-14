using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class MessageFileConfiguration : IEntityTypeConfiguration<MessageFile> {
        public void Configure(EntityTypeBuilder<MessageFile> builder) {
            builder.HasKey(mf => new { mf.MessageId, mf.FileId });

            builder.Property(mf => mf.CreatedAt)
                .HasDefaultValueSql("now()");

            builder.Property(mf => mf.UpdatedAt)
                .HasDefaultValueSql("now()");

            builder.HasOne(mf => mf.Message)
                .WithMany(m => m!.MessageFiles)
                .HasForeignKey(mf => mf.MessageId);

            builder.HasOne(mf => mf.File)
                .WithMany(f => f!.MessageFiles)
                .HasForeignKey(mf => mf.FileId);
        }
    }
}
