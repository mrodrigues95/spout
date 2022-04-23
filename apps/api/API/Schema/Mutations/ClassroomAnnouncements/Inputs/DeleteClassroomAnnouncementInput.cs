using API.Data.Entities;
using HotChocolate.Types.Relay;

namespace API.Schema.Mutations.ClassroomAnnouncements.Inputs {
    public record DeleteClassroomAnnouncementInput(
        [property: ID(nameof(ClassroomAnnouncement))] int ClassroomAnnouncementId);
}
