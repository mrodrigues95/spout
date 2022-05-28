using System;

namespace API.Data.Entities {
    public class ClassroomSyllabusFile {
        public int ClassroomSyllabusId { get; set; }
        public ClassroomSyllabus? ClassroomSyllabus { get; set; }

        public int FileId { get; set; }
        public File? File { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
