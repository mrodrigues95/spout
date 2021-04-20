using API.Data;
using API.Data.Entities;
using API.Extensions;
using HotChocolate;
using HotChocolate.Types;
using System.Threading;
using System.Threading.Tasks;

namespace API.Schema.Classrooms {
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class ClassroomMutations {
        [UseApplicationDbContext]
        public async Task<CreateClassroomPayload> CreateClassroomAsync(
            CreateClassroomInput input,
            [ScopedService] ApplicationDbContext context,
            CancellationToken cancellationToken) {
            var classroom = new Classroom {
                Name = input.Name,
            };

            context.Classrooms.Add(classroom);
            await context.SaveChangesAsync(cancellationToken);

            return new CreateClassroomPayload(classroom);
        }
    }
}
