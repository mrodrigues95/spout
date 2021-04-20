using API.Common;
using API.Data.Entities;
using System.Collections.Generic;

namespace API.Schema.Classrooms {
    public class CreateClassroomPayload : ClassroomPayloadBase {
        public CreateClassroomPayload(Classroom classroom) : base(classroom) { }
        public CreateClassroomPayload(IReadOnlyList<UserError> errors) : base(errors) { }
    }
}
