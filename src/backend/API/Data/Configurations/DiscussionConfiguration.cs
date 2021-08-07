using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace API.Data.Configurations {
    public class DiscussionConfiguration : IEntityTypeConfiguration<Discussion> {
        public void Configure(EntityTypeBuilder<Discussion> builder) {
            builder.HasKey(d => d.Id);

            builder.Property(d => d.Name)
                .HasMaxLength(50);

            builder.Property(d => d.CreatedAt)
                .HasDefaultValue(DateTime.UtcNow);

            builder.Property(d => d.UpdatedAt)
                .HasDefaultValue(DateTime.UtcNow);

            builder.HasIndex(d => new { d.CreatedById, d.ClassroomId });

            builder.HasOne(d => d.Classroom)
                .WithMany(c => c!.Discussions)
                .HasForeignKey(d => d.ClassroomId);

            builder.HasOne(d => d.CreatedBy)
                .WithMany()
                .HasForeignKey(d => d.CreatedById);

            builder.HasMany(d => d.Messages)
                .WithOne(m => m.Discussion!)
                .HasForeignKey(m => m.DiscussionId);

            builder.HasOne(d => d.DelLog)
                .WithMany(dl => dl!.DeletedDiscussions)
                .HasForeignKey(d => d.DelLogId);

            builder.HasOne(d => d.State)
                .WithMany(s => s!.Discussions)
                .HasForeignKey(d => d.StateId);
        }
    }
}
