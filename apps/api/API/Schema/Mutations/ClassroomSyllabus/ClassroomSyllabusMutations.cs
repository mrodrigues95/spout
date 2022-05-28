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

        // TODO: Move this to separate mutations to simplify it (i.e. insert/update/delete mutations).
        [Authorize]
        [Error(typeof(ClassroomNotFoundException))]
        public async Task<Classroom> UpsertClassroomSyllabusAsync(
            [GlobalUserId] int userId,
            IClassroomTimelineManager timelineManager,
            UpsertClassroomSyllabusInput input,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            // TODO: Figure out how to handle max file limits.
            // We can validate the limits here but we should also block the user on the front-end
            // before even getting to this point. Maybe it would be good to add a field on the type
            // called `isFileLimitExceeded` or something of that nature.

            //if (input.FileIds.Length > 10) {
            //    throw new FileLimitExceededException(
            //        "File limit exceeded - cannot upload more than 10 files per classroom syllabus.");
            //}

            var classroom = await ctx.Classrooms
                .Include(c => c.Syllabus)
                    .ThenInclude(cs => cs == null ? default! : cs.Files)
                        .ThenInclude(csf => csf.File)
                .SingleOrDefaultAsync(c => c.Id == input.ClassroomId, cancellationToken);
            if (classroom is null) throw new ClassroomNotFoundException();

            var shouldUpsert = input.Content is not null;
            if (shouldUpsert) {
                if (classroom.Syllabus is null) {
                    classroom.Syllabus = new Entities.ClassroomSyllabus {
                        ClassroomId = classroom.Id,
                        Content = input.Content,
                    };

                    foreach (var fileId in input.FileIds) {
                        classroom.Syllabus.Files.Add(new ClassroomSyllabusFile {
                            ClassroomSyllabusId = classroom.Syllabus.Id,
                            FileId = fileId
                        });
                    }

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
                    foreach (var fileId in input.FileIds) {
                        classroom.Syllabus.Files.Add(new ClassroomSyllabusFile {
                            ClassroomSyllabusId = classroom.Syllabus.Id,
                            FileId = fileId
                        });
                    }
                    classroom.Syllabus.Content = input.Content;
                    classroom.Syllabus.UpdatedAt = DateTime.UtcNow;
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
                    foreach (var syllabusFile in classroom.Syllabus.Files) {
                        syllabusFile.File!.IsDeleted = true;
                        syllabusFile.File!.Location = null;
                        syllabusFile.File!.UpdatedAt = DateTime.UtcNow;
                        syllabusFile.File!.DeletedAt = DateTime.UtcNow;
                    }

                    ctx.ClassroomSyllabus.Remove(classroom.Syllabus);
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
