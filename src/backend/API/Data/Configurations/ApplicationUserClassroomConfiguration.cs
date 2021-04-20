using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class ApplicationUserClassroomConfiguration : IEntityTypeConfiguration<ApplicationUserClassroom> {
        public void Configure(EntityTypeBuilder<ApplicationUserClassroom> builder) {
            // Many-to-many: ApplicationUser <--> Classroom
            builder.HasKey(auc => new { auc.ApplicationUserId, auc.ClassroomId });

            builder.HasOne(auc => auc.ApplicationUser)
                .WithMany(au => au!.ApplicationUserClassrooms)
                .HasForeignKey(auc => auc.ApplicationUserId);

            builder.HasOne(auc => auc.Classroom)
                .WithMany(c => c!.ApplicationUserClassrooms)
                .HasForeignKey(auc => auc.ClassroomId);
        }
    }
}
