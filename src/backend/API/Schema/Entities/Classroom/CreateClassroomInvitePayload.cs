using Entity = API.Data.Entities;

namespace API.Schema.Entities.Classroom {
    public record CreateClassroomInvitePayload(Entity.Invite invite);
}
