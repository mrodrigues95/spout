using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class MessageConfiguration : IEntityTypeConfiguration<Message> {
        public void Configure(EntityTypeBuilder<Message> builder) {
            builder.HasKey(m => m.Id);

            builder.Property(m => m.CreatedById)
                .IsRequired();

            builder.Property(m => m.DiscussionId)
                .IsRequired();

            builder.Property(m => m.PinnedById)
                .IsRequired(false);

            builder.Property(m => m.Content)
                .HasMaxLength(2000)
                .IsRequired()
                .HasDefaultValue("");

            builder.Property(m => m.IsEvent)
                .HasDefaultValue(false)
                .IsRequired();

            builder.Property(m => m.CreatedAt)
                .HasDefaultValueSql("timezone('UTC', now())")
                .IsRequired();

            builder.Property(m => m.UpdatedAt)
                .HasDefaultValueSql("timezone('UTC', now())")
                .IsRequired();

            builder.Property(m => m.DeletedAt)
                .IsRequired(false);

            builder.Property(m => m.PinnedAt)
                .IsRequired(false);

            builder.HasIndex(m => new { m.CreatedById, m.DiscussionId });

            builder.HasOne(m => m.CreatedBy)
                .WithMany(u => u!.Messages)
                .HasForeignKey(m => m.CreatedById);

            builder.HasOne(m => m.PinnedBy)
                .WithMany(u => u!.PinnedMessages)
                .HasForeignKey(m => m.PinnedById)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired(false);

            builder.HasOne(m => m.ParentMessage)
                .WithMany(m => m!.MessageLinks)
                .HasForeignKey(m => m.ParentMessageId)
                .IsRequired(false);

            builder.HasOne(m => m.Discussion)
                .WithMany(d => d!.Messages)
                .HasForeignKey(m => m.DiscussionId);

            builder.HasMany(m => m.MessageFiles)
                .WithOne(mf => mf.Message!)
                .HasForeignKey(mf => mf.MessageId);

            builder.HasOne(m => m.DelLog)
                .WithMany(d => d!.DeletedMessages)
                .HasForeignKey(m => m.DelLogId);
        }
    }
}
