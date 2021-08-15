using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;

namespace API.Data.Configurations {
    public class UserClassroomConfiguration : IEntityTypeConfiguration<UserClassroom> {
        public void Configure(EntityTypeBuilder<UserClassroom> builder) {
            builder.HasKey(uc => new { uc.UserId, uc.ClassroomId });

            builder.Property(uc => uc.IsCreator)
                .HasDefaultValue(false);

            builder.HasOne(uc => uc.User)
                .WithMany(u => u!.UserClassrooms)
                .HasForeignKey(uc => uc.UserId);

            builder.HasOne(uc => uc.Classroom)
                .WithMany(c => c!.UserClassrooms)
                .HasForeignKey(uc => uc.ClassroomId);

            builder.HasIndex(uc => uc.IsCreator);
        }
    }
}
