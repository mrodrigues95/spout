using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class UserClassroomConfiguration : IEntityTypeConfiguration<UserClassroom> {
        public void Configure(EntityTypeBuilder<UserClassroom> builder) {
            // Many-to-many: ApplicationUser <--> Classroom
            builder.HasKey(auc => new { auc.UserId, auc.ClassroomId });

            builder.HasOne(auc => auc.User)
                .WithMany(au => au!.UserClassrooms)
                .HasForeignKey(auc => auc.UserId);

            builder.HasOne(auc => auc.Classroom)
                .WithMany(c => c!.UserClassrooms)
                .HasForeignKey(auc => auc.ClassroomId);
        }
    }
}
