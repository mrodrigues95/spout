using System;

namespace API.Schema.Mutations.ClassroomAnnouncements.Exceptions {
    public class ClassroomAnnouncementNotFoundException : Exception {
        public ClassroomAnnouncementNotFoundException()
            : base("Classroom announcement not found.") { }
    }
}
