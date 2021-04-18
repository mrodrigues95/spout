using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class ClassroomApplicationUserConfiguration : IEntityTypeConfiguration<ClassroomApplicationUser> {
        public void Configure(EntityTypeBuilder<ClassroomApplicationUser> builder) {
            // Many-to-many: Classrom <--> ApplicationUser
            builder.HasKey(cau => new { cau.ApplicationUserId, cau.ClassroomId });
        }
    }
}
