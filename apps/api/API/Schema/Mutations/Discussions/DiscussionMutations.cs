using API.Data.Entities;
using Enums = API.Common.Enums;
using HotChocolate.Types;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Subscriptions;
using API.Extensions;
using API.Data;
using API.Schema.Common;
using System.Threading;
using Microsoft.EntityFrameworkCore;

namespace API.Schema.Mutations.Discussions {
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class DiscussionMutations {
        [UseApplicationDbContext]
        public async Task<SendDiscussionMessagePayload> SendDiscussionMessageAsync(
            SendDiscussionMessageInput input,
            [GlobalState] int userId,
            [Service] ITopicEventSender sender,
            [ScopedService] ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var discussion = await ctx.Discussions.FindAsync(
                new object[] { input.DiscussionId },
                cancellationToken);

            if (discussion is null) {
                return new SendDiscussionMessagePayload(
                  new UserError("Discussion not found.", "DISCUSSION_NOT_FOUND"));
            }

            var message = new Message {
                Content = input.Content,
                DiscussionId = discussion.Id,
                CreatedById = userId
            };

            discussion.Messages.Add(message);
            await ctx.SaveChangesAsync(cancellationToken);

            await sender.SendAsync(
              "OnDiscussionMessageReceived_" + discussion.Id,
              message.Id,
              cancellationToken);

            return new SendDiscussionMessagePayload(message);
        }

        [UseApplicationDbContext]
        public async Task<CreateDiscussionPayload> CreateDiscussionAsync(
          CreateDiscussionInput input,
          [GlobalState] int userId,
          [ScopedService] ApplicationDbContext ctx,
          CancellationToken cancellationToken) {
            var classroom = await ctx.Classrooms
                .Include(x => x.Discussions)
                .SingleOrDefaultAsync(x =>
                    x.Id == input.ClassroomId, cancellationToken);

            if (classroom is null) {
                return new CreateDiscussionPayload(
                    new UserError("Classroom not found.", "CLASSROOM_NOT_FOUND"));
            }

            foreach (var _discussion in classroom.Discussions) {
                if (_discussion.Name == input.Name) {
                    return new CreateDiscussionPayload(
                        new UserError("A discussion with this name already exists.",
                            "NON_UNIQUE_DISCUSSION_NAME"));
                }
            }

            var discussion = new Discussion {
                Name = input.Name,
                StateId = (int)Enums.State.Active,
                CreatedById = userId,
                ClassroomId = classroom.Id
            };

            classroom.Discussions.Add(discussion);
            await ctx.SaveChangesAsync(cancellationToken);

            return new CreateDiscussionPayload(discussion);
        }
    }
}
