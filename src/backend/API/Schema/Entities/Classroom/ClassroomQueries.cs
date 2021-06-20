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
using System.Linq;

namespace API.Schema.Entities.Classroom {
    [Authorize]
    [ExtendObjectType(OperationTypeNames.Query)]
    public class ClassroomQueries {
        [UseApplicationDbContext]
        public async Task<IEnumerable<Entity.Classroom>> GetClassroomsAsync(
            [ScopedService] ApplicationDbContext context,
            CancellationToken cancellationToken) =>
            await context.Classrooms.ToListAsync(cancellationToken);

        [UseApplicationDbContext]
        public async Task<Entity.Classroom> GetClassroomByIdAsync(
            [ID(nameof(Entity.Classroom))] int id,
            ClassroomByIdDataLoader classroomById,
            CancellationToken cancellationToken) =>
            await classroomById.LoadAsync(id, cancellationToken);

        [UseApplicationDbContext]
        public async Task<IEnumerable<Entity.Classroom>> GetClassroomsByIdAsync(
            [ID(nameof(Entity.Classroom))] int[] ids,
            ClassroomByIdDataLoader classroomById,
            CancellationToken cancellationToken) =>
            await classroomById.LoadAsync(ids, cancellationToken);

        [UseApplicationDbContext]
        public async Task<IEnumerable<Entity.Classroom>> GetClassroomsByUserAsync(
            [GlobalState] int userId,
            [ScopedService] ApplicationDbContext context,
            CancellationToken cancellationToken) =>
            await context.UserClassrooms
                .Where(uc => uc.UserId == userId)
                .Select(uc => uc.Classroom!)
                .ToListAsync(cancellationToken);
    }
}
