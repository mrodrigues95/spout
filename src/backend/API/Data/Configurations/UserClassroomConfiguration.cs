using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class UserClassroomConfiguration : IEntityTypeConfiguration<UserClassroom> {
        public void Configure(EntityTypeBuilder<UserClassroom> builder) {
            // Many-to-many: User <--> Classroom
            builder.HasKey(uc => new { uc.UserId, uc.ClassroomId });

            builder.HasIndex(uc => new { uc.UserId, uc.ClassroomId });

            builder.HasOne(uc => uc.User)
                .WithMany(u => u!.UserClassrooms)
                .HasForeignKey(uc => uc.UserId);

            builder.HasOne(uc => uc.Classroom)
                .WithMany(c => c!.UserClassrooms)
                .HasForeignKey(uc => uc.ClassroomId);
        }
    }
}
