using System;

namespace API.Data.Entities {
    public class ClassroomApplicationUser {
        public Guid ClassroomId { get; set; }
        public Classroom? Classroom { get; set; }
        public string? ApplicationUserId { get; set; }
        public ApplicationUser? ApplicationUser { get; set; }
        public bool IsCreator { get; set; }
    }
}
