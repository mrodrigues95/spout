namespace API.Data.Entities {
    public class UserClassroom {
        public int ClassroomId { get; set; }
        public Classroom? Classroom { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; }
    }
}
