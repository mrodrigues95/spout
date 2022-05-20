using System;
using System.Threading.Tasks;
using API.Data;
using API.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Infrastructure {
    public class ClassroomTimelineManager : IClassroomTimelineManager, IAsyncDisposable {
        private readonly ILogger<ClassroomTimelineManager> _logger;
        private readonly ApplicationDbContext _ctx;

        public ClassroomTimelineManager(
            IDbContextFactory<ApplicationDbContext> dbContextFactory,
            ILogger<ClassroomTimelineManager> logger) {
            _ctx = dbContextFactory.CreateDbContext();
            _logger = logger;
        }

        public ValueTask DisposeAsync() => _ctx.DisposeAsync();

        // TODO: Group recent events.
        // E.g. updates to the same event within the last ~15 minutes shouldn't create a new event,
        // instead it should just update the existing one. We could also do a similar thing for
        // mutation events, meaning for example if the user creates 5 dicussions in the last ~15 minutes,
        // we could show "x created a new discussion, plus 4 more" as one event item.
        public async Task CreateTimelineEvent(
            Classroom classroom,
            ClassroomTimelineEvent timelineEvent) {
            _ctx.ClassroomTimelineEvents.Add(timelineEvent);
            await _ctx.SaveChangesAsync();

            _logger.LogInformation(
                "New classroom event created for classroom: {classroom}. Event: {event}",
                classroom.Id,
                timelineEvent.Event);
        }
    }
}
