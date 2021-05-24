using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class SessionConfiguration : IEntityTypeConfiguration<Session> {
        public void Configure(EntityTypeBuilder<Session> builder) {
            builder.HasKey(s => s.Id);

            builder.Property(s => s.CreatedAt).IsRequired();

            builder.Property(s => s.UpdatedAt).IsRequired();

            builder.Property(s => s.UserId).IsRequired();

            builder.HasOne(s => s.User)
                .WithMany(u => u!.Sessions)
                .HasForeignKey(s => s.UserId)
                .IsRequired();
        }
    }
}
