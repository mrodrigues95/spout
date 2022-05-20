using System.Threading.Tasks;
using API.Data.Entities;

namespace API.Infrastructure {
    public interface IClassroomTimelineManager {
        Task CreateTimelineEvent(Classroom classroom, ClassroomTimelineEvent timelineEvent);
    }
}
