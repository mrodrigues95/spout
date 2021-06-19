using Entity = API.Data.Entities;
using HotChocolate.Types;
using HotChocolate.Resolvers;
using System.Threading.Tasks;
using API.Schema.Entities.Classroom;
using System.Threading;
using API.Schema.Entities.User;

namespace API.Schema.Entities.Discussion {
    public class DiscussionType : ObjectType<Entity.Discussion> {
        protected override void Configure(IObjectTypeDescriptor<Entity.Discussion> descriptor) {
            descriptor
                .ImplementsNode()
                .IdField(d => d.Id)
                .ResolveNode((ctx, id) => ctx.DataLoader<DiscussionByIdDataLoader>().LoadAsync(id, ctx.RequestAborted));

            descriptor
                .Field(d => d.CreatedBy)
                .ResolveWith<DiscussionResolvers>(x => x.GetCreatedByAsync(default!, default!, default!))
                .Name("createdBy");

            descriptor
                .Field(d => d.Classroom)
                .ResolveWith<DiscussionResolvers>(x => x.GetClassroomAsync(default!, default!, default!))
                .Name("classroom");
        }

        private class DiscussionResolvers {
            public Task<Entity.Classroom> GetClassroomAsync(
                Entity.Discussion discussion,
                ClassroomByIdDataLoader classroomById,
                CancellationToken cancellationToken) =>
                    classroomById.LoadAsync(discussion.ClassroomId, cancellationToken);
            public Task<Entity.User> GetCreatedByAsync(
                Entity.Discussion discussion,
                UserByIdDataLoader userById,
                CancellationToken cancellationToken) =>
                    userById.LoadAsync(discussion.CreatedById, cancellationToken);
        }
    }
}
