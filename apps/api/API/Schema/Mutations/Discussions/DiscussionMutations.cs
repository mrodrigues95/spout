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
using HotChocolate.AspNetCore.Authorization;
using API.Schema.Types.Discussions;
using System;

namespace API.Schema.Mutations.Discussions {
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class DiscussionMutations {
        [Authorize]
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
                Content = input.Content.Trim(),
                DiscussionId = discussion.Id,
                CreatedById = userId,
                IsDiscussionEvent = false
            };

            // Save files that are attached to this message.
            foreach (var fileId in input.FileIds) {
                message.MessageFiles.Add(new MessageFile {
                    MessageId = message.Id,
                    FileId = fileId
                });
            }

            discussion.Messages.Add(message);
            await ctx.SaveChangesAsync(cancellationToken);

            await sender.SendAsync(
              "OnDiscussionMessageReceived_" + discussion.Id,
              message.Id,
              cancellationToken);

            return new SendDiscussionMessagePayload(message);
        }

        [Authorize]
        [UseApplicationDbContext]
        public async Task<CreateDiscussionPayload> CreateDiscussionAsync(
            CreateDiscussionInput input,
            [GlobalState] int userId,
            [ScopedService] ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var classroom = await ctx.Classrooms.FindAsync(
                new object[] { input.ClassroomId },
                cancellationToken);

            if (classroom is null)
                throw new GraphQLException("Classroom not found.");

            var discussion = new Discussion {
                Name = input.Name.Trim(),
                StateId = (int)Enums.State.Active,
                CreatedById = userId,
                ClassroomId = classroom.Id
            };

            classroom.Discussions.Add(discussion);
            await ctx.SaveChangesAsync(cancellationToken);

            return new CreateDiscussionPayload(discussion);
        }

        [Authorize]
        [UseApplicationDbContext]
        public async Task<UpdateDiscussionTopicPayload> UpdateDiscussionTopicAsync(
        UpdateDiscussionTopicInput input,
        [GlobalState] int userId,
        [Service] ITopicEventSender sender,
        [ScopedService] ApplicationDbContext ctx,
        CancellationToken cancellationToken) {
            var discussion = await ctx.Discussions.FindAsync(
                new object[] { input.DiscussionId },
                cancellationToken);

            if (discussion is null) {
                return new UpdateDiscussionTopicPayload(
                  new UserError("Discussion not found.", "DISCUSSION_NOT_FOUND"));
            }

            var message = new Message {
                Content = input.Topic.Trim(),
                DiscussionId = discussion.Id,
                CreatedById = userId,
                IsDiscussionEvent = true,
                DiscussionEvent = DiscussionEvent.CHANGE_TOPIC
            };

            discussion.Messages.Add(message);
            discussion.Topic = input.Topic.Trim();
            discussion.UpdatedAt = DateTime.UtcNow;
            await ctx.SaveChangesAsync(cancellationToken);

            await sender.SendAsync(
              "OnDiscussionMessageReceived_" + discussion.Id,
              message.Id,
              cancellationToken);

            return new UpdateDiscussionTopicPayload(discussion);
        }

        [Authorize]
        [UseApplicationDbContext]
        public async Task<UpdateDiscussionDescriptionPayload> UpdateDiscussionDescriptionAsync(
        UpdateDiscussionDescriptionInput input,
        [GlobalState] int userId,
        [Service] ITopicEventSender sender,
        [ScopedService] ApplicationDbContext ctx,
        CancellationToken cancellationToken) {
            var discussion = await ctx.Discussions.FindAsync(
                new object[] { input.DiscussionId },
                cancellationToken);

            if (discussion is null) {
                return new UpdateDiscussionDescriptionPayload(
                  new UserError("Discussion not found.", "DISCUSSION_NOT_FOUND"));
            }

            var message = new Message {
                Content = input.Description.Trim(),
                DiscussionId = discussion.Id,
                CreatedById = userId,
                IsDiscussionEvent = true,
                DiscussionEvent = DiscussionEvent.CHANGE_DESCRIPTION
            };

            discussion.Messages.Add(message);
            discussion.Description = input.Description.Trim();
            discussion.UpdatedAt = DateTime.UtcNow;
            await ctx.SaveChangesAsync(cancellationToken);

            await sender.SendAsync(
              "OnDiscussionMessageReceived_" + discussion.Id,
              message.Id,
              cancellationToken);

            return new UpdateDiscussionDescriptionPayload(discussion);
        }
    }
}
