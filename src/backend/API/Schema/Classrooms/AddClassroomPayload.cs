using API.Common;
using API.Data.Entities;
using System.Collections.Generic;

namespace API.Schema.Classrooms {
    public class AddClassroomPayload : ClassroomPayloadBase {
        public AddClassroomPayload(Classroom classroom) : base(classroom) { }
        public AddClassroomPayload(IReadOnlyList<UserError> errors) : base(errors) { }
    }
}
