using API.Data.Entities;
using HotChocolate.Types;
using System.Threading.Tasks;
using System.Threading;
using API.Schema.Queries.Messages;
using API.Schema.Queries.Users;
using API.Schema.Types.Users;
using HotChocolate;
using API.Schema.Types.Files;
using API.Schema.Queries.Files;
using API.Data;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using API.Schema.Types.Discussions;

namespace API.Schema.Types.Messages {
    public class MessageType : ObjectType<Message> {
        protected override void Configure(IObjectTypeDescriptor<Message> descriptor) {
            descriptor
                .ImplementsNode()
                .IdField(m => m.Id)
                .ResolveNode((ctx, id) =>
                    ctx.DataLoader<MessageByIdDataLoader>().LoadAsync(id, ctx.RequestAborted));

            descriptor
                .Field(m => m.Content)
                .Type<NonNullType<StringType>>();

            descriptor
                .Field(m => m.DiscussionId)
                .Type<NonNullType<IntType>>()
                .Ignore();

            descriptor
                .Field(m => m.CreatedById)
                .Type<NonNullType<IntType>>()
                .Ignore();

            descriptor
                .Field(m => m.PinnedById)
                .Type<IntType>()
                .Ignore();

            descriptor
                .Field(m => m.Discussion)
                .Type<NonNullType<DiscussionType>>();

            descriptor
                .Field(m => m.IsDiscussionEvent)
                .Type<NonNullType<BooleanType>>();

            descriptor
                .Field(m => m.CreatedAt)
                .Type<NonNullType<DateTimeType>>();

            descriptor
                .Field(m => m.UpdatedAt)
                .Type<NonNullType<DateTimeType>>();

            descriptor
                .Field(m => m.CreatedBy)
                .Type<NonNullType<UserType>>()
                .ResolveWith<MessageResolvers>(x =>
                    x.GetCreatedByAsync(default!, default!, default!))
                .Name("createdBy");

            descriptor
                .Field(m => m.PinnedBy)
                .Type<UserType>()
                .ResolveWith<MessageResolvers>(x =>
                    x.GetPinnedByAsync(default!, default!, default!))
                .Name("pinnedBy");

            descriptor
                .Field(m => m.MessageFiles)
                .Type<NonNullType<ListType<NonNullType<FileType>>>>()
                .UseDbContext<ApplicationDbContext>()
                .ResolveWith<MessageResolvers>(x =>
                    x.GetAttachmentsAsync(default!, default!, default!, default!))
                .Name("attachments");
        }

        private class MessageResolvers {
            public async Task<User> GetCreatedByAsync(
            [Parent] Message message,
            UserByIdDataLoader userById,
            CancellationToken cancellationToken)
            => await userById.LoadAsync(message.CreatedById, cancellationToken);

            public async Task<User?> GetPinnedByAsync(
            [Parent] Message message,
            UserByIdDataLoader userById,
            CancellationToken cancellationToken)
            => message.PinnedById is null
                ? null
                : await userById.LoadAsync(message.PinnedById.Value, cancellationToken);

            public async Task<IEnumerable<File>> GetAttachmentsAsync(
                [Parent] Message message,
                [ScopedService] ApplicationDbContext ctx,
                FileByIdDataLoader fileById,
                CancellationToken cancellationToken) {
                int[] fileIds = await ctx.Messages
                    .Where(m => m.Id == message.Id)
                    .Include(m => m.MessageFiles)
                    .SelectMany(m => m.MessageFiles)
                        .Where(mf => !mf.File!.IsDeleted &&
                            mf.File!.Location != null &&
                            mf.File!.UploadStatus == FileUploadStatus.COMPLETED &&
                            mf.File!.UploadedById == message.CreatedById)
                        .Select(mf => mf.FileId)
                    .ToArrayAsync(cancellationToken);

                return await fileById.LoadAsync(fileIds, cancellationToken);
            }
        }
    }
}
