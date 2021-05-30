namespace API.Data.Entities {
    public class UserDiscussion {
        public int DiscussionId { get; set; }
        public Discussion? Discussion { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; }
    }
}
