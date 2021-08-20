using API.Data;
using Entity = API.Data.Entities;
using API.Extensions;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate.AspNetCore.Authorization;

namespace API.Schema.Entities.Classroom {
    [ExtendObjectType(OperationTypeNames.Query)]
    public class ClassroomQueries {
        [Authorize]
        [UseApplicationDbContext]
        public async Task<IEnumerable<Entity.Classroom>> GetClassroomsAsync(
            [ScopedService] ApplicationDbContext context,
            CancellationToken cancellationToken) =>
            await context.Classrooms.ToListAsync(cancellationToken);

        [Authorize]
        [UseApplicationDbContext]
        public async Task<Entity.Classroom> GetClassroomByIdAsync(
            [ID(nameof(Entity.Classroom))] int id,
            ClassroomByIdDataLoader classroomById,
            CancellationToken cancellationToken) =>
            await classroomById.LoadAsync(id, cancellationToken);

        [Authorize]
        [UseApplicationDbContext]
        public async Task<IEnumerable<Entity.Classroom>> GetClassroomsByIdAsync(
            [ID(nameof(Entity.Classroom))] int[] ids,
            ClassroomByIdDataLoader classroomById,
            CancellationToken cancellationToken) =>
            await classroomById.LoadAsync(ids, cancellationToken);
    }
}
