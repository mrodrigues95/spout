using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace API.Data.Configurations {
    public class ClassroomConfiguration : IEntityTypeConfiguration<Classroom> {
        public void Configure(EntityTypeBuilder<Classroom> builder) {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Name)
                .HasMaxLength(35);

            builder.Property(c => c.CreatedAt)
                .HasDefaultValue(DateTime.UtcNow);

            builder
                .Property(c => c.UpdatedAt)
                .HasDefaultValue(DateTime.UtcNow);

            builder.HasMany(c => c.UserClassrooms)
                .WithOne(uc => uc.Classroom!)
                .HasForeignKey(uc => uc.ClassroomId);

            builder.HasMany(c => c.Discussions)
                .WithOne(c => c.Classroom!)
                .HasForeignKey(c => c.ClassroomId);

            builder.HasMany(c => c.Invites)
                .WithOne(i => i.Classroom!)
                .HasForeignKey(i => i.ClassroomId);

            builder.HasOne(c => c.DelLog)
                .WithMany(d => d!.DeletedClassrooms)
                .HasForeignKey(c => c.DelLogId);           

            builder.HasOne(c => c.State)
                .WithMany(s => s!.Classrooms)
                .HasForeignKey(c => c.StateId);
        }
    }
}
