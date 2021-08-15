namespace API.Data.Entities {
    public class InviteLog {
        public int InviteId { get; set; }
        public Invite? Invite { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; }

        public bool? IsInviter { get; set; }
    }
}
