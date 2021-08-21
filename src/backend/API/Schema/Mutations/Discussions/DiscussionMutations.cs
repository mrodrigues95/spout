﻿using API.Data.Entities;
using HotChocolate.Types;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Subscriptions;
using API.Extensions;
using API.Data;
using API.Schema.Common;
using System.Threading;
using API.Schema.Subscriptions.Discussions;

namespace API.Schema.Mutations.Discussions {
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class DiscussionMutations {
        [UseApplicationDbContext]
        public async Task<SendDiscussionMessagePayload> SendDiscussionMessageAsync(
            SendDiscussionMessageInput input,
            [GlobalState] int userId,
            [Service] ITopicEventSender sender,
            [ScopedService] ApplicationDbContext context,
            CancellationToken cancellationToken) {
            var discussion = await context.Discussions.FindAsync(input.DiscussionId);
            if (discussion is null) {
                return new SendDiscussionMessagePayload(new UserError("Discussion not found", "DISCUSSION_NOT_FOUND"));
            }

            var message = new Message {
                Content = input.Content,
                DiscussionId = input.DiscussionId,
                CreatedById = userId
            };

            discussion.Messages.Add(message);
            await context.SaveChangesAsync(cancellationToken);

            await sender.SendAsync("OnDiscussionMessageReceived_" + input.DiscussionId, message.Id, cancellationToken);

            return new SendDiscussionMessagePayload(message);
        }
    }
}