namespace API.Data.Entities {
    public class ApplicationUserClassroom {
        public int ClassroomId { get; set; }
        public Classroom? Classroom { get; set; }

        public int ApplicationUserId { get; set; }
        public ApplicationUser? ApplicationUser { get; set; }
    }
}
