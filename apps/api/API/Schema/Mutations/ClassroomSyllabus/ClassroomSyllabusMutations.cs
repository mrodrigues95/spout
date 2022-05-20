using System;
using System.Threading;
using System.Threading.Tasks;
using API.Attributes;
using API.Data;
using API.Data.Entities;
using API.Infrastructure;
using API.Schema.Mutations.Classrooms.Exceptions;
using API.Schema.Mutations.ClassroomSyllabus.Inputs;
using API.Schema.Types.ClassroomTimelineEvents;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Entities = API.Data.Entities;

namespace API.Schema.Mutations.ClassroomSyllabus {
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class ClassroomSyllabusMutations {
        private readonly ILogger<ClassroomSyllabusMutations> _logger;

        public ClassroomSyllabusMutations(ILogger<ClassroomSyllabusMutations> logger) {
            _logger = logger;
        }

        [Authorize]
        [Error(typeof(ClassroomNotFoundException))]
        public async Task<Classroom> UpsertClassroomSyllabusAsync(
            [GlobalUserId] int userId,
            IClassroomTimelineManager timelineManager,
            UpsertClassroomSyllabusInput input,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var classroom = await ctx.Classrooms
                .Include(c => c.Syllabus)
                .SingleOrDefaultAsync(c => c.Id == input.ClassroomId);
            if (classroom is null) throw new ClassroomNotFoundException();

            var shouldUpsert = input.Content is not null;
            if (shouldUpsert) {
                if (classroom.Syllabus is null) {
                    classroom.Syllabus = new Entities.ClassroomSyllabus {
                        ClassroomId = classroom.Id,
                        Content = input.Content
                    };
                    await ctx.SaveChangesAsync(cancellationToken);
                    await timelineManager.CreateTimelineEvent(
                        classroom,
                        new ClassroomTimelineEvent {
                            TriggeredById = userId,
                            ClassroomId = classroom.Id,
                            Event = ClassroomTimelineEventItem.SYLLABUS_CREATED,
                            ClassroomSyllabusId = classroom.Syllabus.Id,
                        });
                } else {
                    classroom.Syllabus!.Content = input.Content;
                    classroom.Syllabus!.UpdatedAt = DateTime.UtcNow;
                    await ctx.SaveChangesAsync(cancellationToken);
                    await timelineManager.CreateTimelineEvent(
                        classroom,
                        new ClassroomTimelineEvent {
                            TriggeredById = userId,
                            ClassroomId = classroom.Id,
                            Event = ClassroomTimelineEventItem.SYLLABUS_UPDATED,
                            ClassroomSyllabusId = classroom.Syllabus.Id,
                        });
                }
            } else {
                if (classroom.Syllabus is not null) {
                    ctx.ClassroomSyllabus.Remove(classroom.Syllabus!);
                    await ctx.SaveChangesAsync(cancellationToken);
                } else {
                    _logger.LogError(
                        "Unable to delete classroom syllabus for classroom: {classroom}. " +
                        "Input: {input}", classroom, input);
                }
            }

            return classroom;
        }
    }
}
