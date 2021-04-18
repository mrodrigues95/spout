using API.Data;
using API.Data.Entities;
using API.Extensions;
using HotChocolate;
using HotChocolate.Types;
using System.Threading;
using System.Threading.Tasks;

namespace API.GraphQL.Classrooms {
    [ExtendObjectType("Mutation")]
    public class ClassroomMutations {
        [UseApplicationDbContext]
        public async Task<AddClassroomPayload> AddClassroomAsync(
            AddClassroomInput input,
            [ScopedService] ApplicationDbContext context,
            CancellationToken cancellationToken) {
            var classroom = new Classroom {
                Name = input.Name,
            };

            context.Classrooms.Add(classroom);
            await context.SaveChangesAsync(cancellationToken);

            return new AddClassroomPayload(classroom);
        }
    }
}
