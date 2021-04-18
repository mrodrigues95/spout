using API.Data;
using API.Data.Entities;
using API.Extensions;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace API.GraphQL.Classrooms {
    [ExtendObjectType("Query")]
    public class ClassroomQueries {
        [UseApplicationDbContext]
        public async Task<IEnumerable<Classroom>> GetClassroomsAsync(
            [ScopedService] ApplicationDbContext context,
            CancellationToken cancellationToken) =>
            await context.Classrooms.ToListAsync(cancellationToken);

        public Task<Classroom> GetClassroomByIdAsync(
            [ID(nameof(Classroom))] Guid id,
            ClassroomByIdDataLoader classroomById,
            CancellationToken cancellationToken) =>
            classroomById.LoadAsync(id, cancellationToken);

        public async Task<IEnumerable<Classroom>> GetClassroomsByIdAsync(
            [ID(nameof(Classroom))] Guid[] ids,
            ClassroomByIdDataLoader classroomById,
            CancellationToken cancellationToken) =>
            await classroomById.LoadAsync(ids, cancellationToken);
    }
}
