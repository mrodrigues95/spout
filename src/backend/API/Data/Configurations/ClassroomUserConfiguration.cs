using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class ClassroomUserConfiguration : IEntityTypeConfiguration<ClassroomUser> {
        public void Configure(EntityTypeBuilder<ClassroomUser> builder) {
            builder.HasKey(cu => new { cu.UserId, cu.ClassroomId });

            builder.Property(i => i.JoinedAt)
                .HasDefaultValueSql("timezone('UTC', now())");

            builder.Property(i => i.UpdatedAt)
                .HasDefaultValueSql("timezone('UTC', now())");

            builder.HasOne(cu => cu.User)
                .WithMany(u => u!.Classrooms)
                .HasForeignKey(cu => cu.UserId);

            builder.HasOne(cu => cu.Classroom)
                .WithMany(c => c!.Users)
                .HasForeignKey(uc => uc.ClassroomId);

            builder.HasIndex(cu => cu.IsCreator);
        }
    }
}
