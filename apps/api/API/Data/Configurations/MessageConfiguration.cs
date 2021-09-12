﻿using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class MessageConfiguration : IEntityTypeConfiguration<Message> {
        public void Configure(EntityTypeBuilder<Message> builder) {
            builder.HasKey(m => m.Id);

            builder.Property(m => m.Content)
                .HasMaxLength(2000);

            builder.Property(m => m.CreatedAt)
                .HasDefaultValueSql("timezone('UTC', now())");

            builder.Property(m => m.UpdatedAt)
                .HasDefaultValueSql("timezone('UTC', now())");

            builder.HasIndex(m => new { m.CreatedById, m.DiscussionId });

            builder.HasOne(m => m.CreatedBy)
                .WithMany(u => u!.Messages)
                .HasForeignKey(m => m.CreatedById);

            builder.HasOne(m => m.Discussion)
                .WithMany(d => d!.Messages)
                .HasForeignKey(m => m.DiscussionId);

            builder.HasOne(m => m.DelLog)
                .WithMany(d => d!.DeletedMessages)
                .HasForeignKey(m => m.DelLogId);
        }
    }
}