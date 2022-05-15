using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations {
    public class ClassroomTimelineEventConfiguration
        : IEntityTypeConfiguration<ClassroomTimelineEvent> {
        public void Configure(EntityTypeBuilder<ClassroomTimelineEvent> builder) {
            builder
                .HasKey(x => x.Id);

            builder
                .Property(x => x.Guid)
                .IsRequired(true);

            builder.Property(x => x.Event)
                .IsRequired();

            builder
                .Property(x => x.UpdatedAt)
                .HasDefaultValueSql("now()");

            builder
                .Property(x => x.CreatedAt)
                .HasDefaultValueSql("now()");

            builder.HasOne(x => x.TriggeredBy)
                .WithMany(u => u!.ClassroomTimelineEvents)
                .HasForeignKey(x => x.TriggeredById)
                .IsRequired(true);

            builder.HasOne(x => x.Classroom)
                .WithMany(c => c!.Events)
                .HasForeignKey(x => x.ClassroomId)
                .IsRequired(true);

            builder.HasOne(x => x.Discussion)
                .WithMany(d => d!.ClassroomTimelineEvents)
                .HasForeignKey(x => x.DiscussionId)
                .IsRequired(false);

            builder.HasOne(x => x.ClassroomSyllabus)
                .WithMany(cs => cs!.ClassroomTimelineEvents)
                .HasForeignKey(x => x.ClassroomSyllabusId)
                .IsRequired(false);

            builder.HasOne(x => x.ClassroomAnnouncement)
                .WithMany(ca => ca!.ClassroomTimelineEvents)
                .HasForeignKey(x => x.ClassroomAnnouncementId)
                .IsRequired(false);

            builder.HasOne(x => x.ClassroomReminder)
                .WithMany(cr => cr!.ClassroomTimelineEvents)
                .HasForeignKey(x => x.ClassroomReminderId)
                .IsRequired(false);
        }
    }
}
