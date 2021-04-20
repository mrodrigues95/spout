using API.Data;
using API.Data.Entities;
using API.Extensions;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace API.Schema.Classrooms {
    [ExtendObjectType(OperationTypeNames.Query)]
    public class ClassroomQueries {
        [UseApplicationDbContext]
        public async Task<IEnumerable<Classroom>> GetClassroomsAsync(
            [ScopedService] ApplicationDbContext context,
            CancellationToken cancellationToken) =>
            await context.Classrooms.ToListAsync(cancellationToken);

        public Task<Classroom> GetClassroomByIdAsync(
            [ID(nameof(Classroom))] int id,
            ClassroomByIdDataLoader classroomById,
            CancellationToken cancellationToken) =>
            classroomById.LoadAsync(id, cancellationToken);

        public async Task<IEnumerable<Classroom>> GetClassroomsByIdAsync(
            [ID(nameof(Classroom))] int[] ids,
            ClassroomByIdDataLoader classroomById,
            CancellationToken cancellationToken) =>
            await classroomById.LoadAsync(ids, cancellationToken);
    }
}
