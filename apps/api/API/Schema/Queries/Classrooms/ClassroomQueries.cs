using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using API.Data;
using API.Data.Entities;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using Microsoft.EntityFrameworkCore;

namespace API.Schema.Queries.Classrooms {
    [ExtendObjectType(OperationTypeNames.Query)]
    public class ClassroomQueries {
        [Authorize]
        public async Task<IEnumerable<Classroom>> GetClassroomsAsync(
            ApplicationDbContext context,
            CancellationToken cancellationToken) =>
            await context.Classrooms.ToListAsync(cancellationToken);

        [Authorize]
        public async Task<Classroom> GetClassroomByIdAsync(
            [ID(nameof(Classroom))] int id,
            ClassroomByIdDataLoader classroomById,
            CancellationToken cancellationToken) =>
            await classroomById.LoadAsync(id, cancellationToken);

        [Authorize]
        public async Task<IEnumerable<Classroom>> GetClassroomsByIdAsync(
            [ID(nameof(Classroom))] int[] ids,
            ClassroomByIdDataLoader classroomById,
            CancellationToken cancellationToken) =>
            await classroomById.LoadAsync(ids, cancellationToken);
    }
}
