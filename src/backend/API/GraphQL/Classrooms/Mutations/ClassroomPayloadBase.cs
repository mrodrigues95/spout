using API.Common;
using API.Data.Entities;
using System.Collections.Generic;

namespace API.GraphQL.Classrooms {
    public class ClassroomPayloadBase : Payload {
        public Classroom? Classroom { get; set; }

        protected ClassroomPayloadBase(Classroom classroom) {
            Classroom = classroom;
        }

        protected ClassroomPayloadBase(IReadOnlyList<UserError> errors) : base(errors) { }
    }
}
