using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class UserDiscussionConfiguration : IEntityTypeConfiguration<UserDiscussion> {
        public void Configure(EntityTypeBuilder<UserDiscussion> builder) {
            // Many-to-many: User <--> Discussion
            builder.HasKey(ud => new { ud.UserId, ud.DiscussionId });

            builder.HasIndex(ud => new { ud.UserId, ud.DiscussionId });

            builder.HasOne(ud => ud.User)
                .WithMany(u => u!.UserDiscussions)
                .HasForeignKey(ud => ud.UserId);

            builder.HasOne(ud => ud.Discussion)
                .WithMany(d => d!.UserDiscussions)
                .HasForeignKey(ud => ud.DiscussionId);
        }
    }
}
