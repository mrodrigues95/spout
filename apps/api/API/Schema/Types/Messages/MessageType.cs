using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using API.Data;
using API.Data.Entities;
using API.Schema.Queries.Files;
using API.Schema.Queries.Messages;
using API.Schema.Queries.Users;
using API.Schema.Types.Discussions;
using API.Schema.Types.Files;
using API.Schema.Types.Users;
using HotChocolate;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;

namespace API.Schema.Types.Messages {
    public enum MessageEvent {
        CHANGE_TOPIC,
        CHANGE_DESCRIPTION,
        PINNED_MESSAGE,
        UNPINNED_MESSAGE
    }

    public class MessageEventType : EnumType<MessageEvent> { }

    public class MessageType : ObjectType<Message> {
        protected override void Configure(IObjectTypeDescriptor<Message> descriptor) {
            descriptor
                .ImplementsNode()
                .IdField(m => m.Id)
                .ResolveNode((ctx, id)
                    => ctx.DataLoader<MessageByIdDataLoader>().LoadAsync(id, ctx.RequestAborted)!);

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
                .Field(m => m.ParentMessageId)
                .Type<IntType>()
                .Ignore();

            descriptor
                .Field(m => m.Discussion)
                .Type<NonNullType<DiscussionType>>();

            descriptor
                .Field(m => m.IsEvent)
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
                    x.GetCreatedByAsync(default!, default!, default!));

            descriptor
                .Field(m => m.PinnedBy)
                .Type<UserType>()
                .ResolveWith<MessageResolvers>(x =>
                    x.GetPinnedByAsync(default!, default!, default!));

            descriptor
                .Field(m => m.ParentMessage)
                .Type<MessageType>()
                .ResolveWith<MessageResolvers>(x =>
                    x.GetParentMessageAsync(default!, default!, default!));

            descriptor
                .Field(m => m.MessageFiles)
                .Type<NonNullType<ListType<NonNullType<FileType>>>>()
                .ResolveWith<MessageResolvers>(x =>
                    x.GetAttachmentsAsync(default!, default!, default!, default!))
                .UseDbContext<ApplicationDbContext>()
                .Name("attachments");

            descriptor
                .Field(m => m.MessageLinks)
                .Type<NonNullType<ListType<NonNullType<MessageType>>>>()
                .ResolveWith<MessageResolvers>(x =>
                    x.GetTriggeredEventsAsync(default!, default!, default!, default!))
                .UseDbContext<ApplicationDbContext>()
                .Name("triggeredEvents");
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

            public async Task<Message?> GetParentMessageAsync(
                [Parent] Message message,
                MessageByIdDataLoader messageById,
                CancellationToken cancellationToken)
                => message.ParentMessageId is null
                    ? null
                    : await messageById.LoadAsync(message.ParentMessageId.Value, cancellationToken);

            public async Task<IEnumerable<File>> GetAttachmentsAsync(
                [Parent] Message message,
                ApplicationDbContext ctx,
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

            public async Task<IEnumerable<Message>> GetTriggeredEventsAsync(
                [Parent] Message message,
                ApplicationDbContext ctx,
                MessageByIdDataLoader messageByIdDataLoader,
                CancellationToken cancellationToken) {
                int[] messageIds = await ctx.Messages
                    .Where(m => m.Id == message.Id)
                    .Include(m => m.MessageLinks)
                    .SelectMany(m => m.MessageLinks)
                        .Where(m => m.ParentMessageId == message.Id)
                        .Select(m => m.Id)
                    .ToArrayAsync(cancellationToken);

                return await messageByIdDataLoader.LoadAsync(messageIds, cancellationToken);
            }
        }
    }
}
