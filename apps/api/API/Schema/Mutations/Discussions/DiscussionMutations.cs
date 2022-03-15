using System;
using System.Threading;
using System.Threading.Tasks;
using API.Attributes;
using API.Data;
using API.Data.Entities;
using API.Schema.Mutations.Discussions.Exceptions;
using API.Schema.Mutations.Discussions.Inputs;
using API.Schema.Types.Messages;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Subscriptions;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Enums = API.Common.Enums;

namespace API.Schema.Mutations.Discussions {
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class DiscussionMutations {
        [Authorize]
        [Error(typeof(DiscussionNotFoundException))]
        public async Task<Message?> SendDiscussionMessageAsync(
            [GlobalUserId] int userId,
            [Service] ITopicEventSender sender,
            SendDiscussionMessageInput input,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var discussion = await ctx.Discussions.FindAsync(
                new object[] { input.DiscussionId },
                cancellationToken);

            if (discussion is null) throw new DiscussionNotFoundException();

            var message = new Message {
                Content = input.Content.Trim(),
                DiscussionId = discussion.Id,
                CreatedById = userId,
                IsEvent = false
            };

            // Save all files that are attached to this message.
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

            return message;
        }

        [Authorize]
        [Error(typeof(DiscussionMessageNotFoundException))]
        public async Task<Message?> UpdateDiscussionMessageAsync(
            UpdateDiscussionMessageInput input,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var message = await ctx.Messages.FindAsync(
                new object[] { input.MessageId },
                cancellationToken);

            if (message is null) throw new DiscussionMessageNotFoundException();

            message.Content = input.Content;
            message.UpdatedAt = DateTime.UtcNow;
            await ctx.SaveChangesAsync(cancellationToken);

            return message;
        }

        [Authorize]
        [Error(typeof(DiscussionMessageNotFoundException))]
        [Error(typeof(DiscussionMessageAlreadyPinnedException))]
        public async Task<Message?> PinDiscussionMessageAsync(
            [GlobalUserId] int userId,
            [Service] ITopicEventSender sender,
            PinDiscussionMessageInput input,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var message = await ctx.Messages
                .Include(m => m.Discussion)
                .SingleOrDefaultAsync(m => m.Id == input.MessageId, cancellationToken);

            if (message is null) throw new DiscussionMessageNotFoundException();
            if (message.PinnedById is not null) throw new DiscussionMessageAlreadyPinnedException();

            var eventMessage = new Message {
                ParentMessageId = message.Id,
                Content = message.Content,
                DiscussionId = message.DiscussionId,
                CreatedById = userId,
                IsEvent = true,
                MessageEvent = MessageEvent.PINNED_MESSAGE
            };

            message.Discussion!.Messages.Add(eventMessage);
            message.MessageLinks.Add(eventMessage);
            message.PinnedById = userId;
            message.UpdatedAt = DateTime.UtcNow;
            message.PinnedAt = DateTime.UtcNow;
            await ctx.SaveChangesAsync(cancellationToken);

            // Send a new message to the discussion when pinning.
            await sender.SendAsync(
              "OnDiscussionMessageReceived_" + eventMessage.DiscussionId,
              eventMessage.Id,
              cancellationToken);

            return message;
        }

        [Authorize]
        [Error(typeof(DiscussionMessageNotFoundException))]
        [Error(typeof(DiscussionMessageAlreadyNotPinnedException))]
        public async Task<Message?> UnpinDiscussionMessageAsync(
            [GlobalUserId] int userId,
            [Service] ITopicEventSender sender,
            UnpinDiscussionMessageInput input,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var message = await ctx.Messages
                .Include(m => m.Discussion)
                .SingleOrDefaultAsync(m => m.Id == input.MessageId, cancellationToken);

            if (message is null) throw new DiscussionMessageNotFoundException();
            if (message.PinnedById is null) throw new DiscussionMessageAlreadyNotPinnedException();

            var eventMessage = new Message {
                ParentMessageId = message.Id,
                Content = message.Content,
                DiscussionId = message.DiscussionId,
                CreatedById = userId,
                IsEvent = true,
                MessageEvent = MessageEvent.UNPINNED_MESSAGE
            };

            message.Discussion!.Messages.Add(eventMessage);
            message.MessageLinks.Add(eventMessage);
            message.PinnedById = null;
            message.PinnedAt = null;
            message.UpdatedAt = DateTime.UtcNow;
            await ctx.SaveChangesAsync(cancellationToken);

            // Send a new message to the discussion when un-pinning.
            await sender.SendAsync(
              "OnDiscussionMessageReceived_" + eventMessage.DiscussionId,
              eventMessage.Id,
              cancellationToken);

            return message;
        }

        [Authorize]
        [Error(typeof(ClassroomNotFoundException))]
        public async Task<Discussion?> CreateDiscussionAsync(
            [GlobalUserId] int userId,
            CreateDiscussionInput input,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var classroom = await ctx.Classrooms.FindAsync(
                new object[] { input.ClassroomId },
                cancellationToken);

            if (classroom is null) {
                throw new ClassroomNotFoundException();
            }

            var discussion = new Discussion {
                Name = input.Name.Trim(),
                StateId = (int)Enums.State.Active,
                CreatedById = userId,
                ClassroomId = classroom.Id
            };

            classroom.Discussions.Add(discussion);
            await ctx.SaveChangesAsync(cancellationToken);

            return discussion;
        }

        [Authorize]
        [Error(typeof(DiscussionNotFoundException))]
        public async Task<Discussion?> UpdateDiscussionTopicAsync(
            [GlobalUserId] int userId,
            [Service] ITopicEventSender sender,
            UpdateDiscussionTopicInput input,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var discussion = await ctx.Discussions.FindAsync(
                new object[] { input.DiscussionId },
                cancellationToken);

            if (discussion is null) throw new DiscussionNotFoundException();

            var eventMessage = new Message {
                Content = input.Topic?.Trim(),
                DiscussionId = discussion.Id,
                CreatedById = userId,
                IsEvent = true,
                MessageEvent = MessageEvent.CHANGE_TOPIC
            };

            discussion.Messages.Add(eventMessage);
            discussion.Topic = input.Topic?.Trim();
            discussion.UpdatedAt = DateTime.UtcNow;
            await ctx.SaveChangesAsync(cancellationToken);

            await sender.SendAsync(
              "OnDiscussionMessageReceived_" + discussion.Id,
              eventMessage.Id,
              cancellationToken);

            return discussion;
        }

        [Authorize]
        [Error(typeof(DiscussionNotFoundException))]
        public async Task<Discussion?> UpdateDiscussionDescriptionAsync(
            [GlobalUserId] int userId,
            [Service] ITopicEventSender sender,
            UpdateDiscussionDescriptionInput input,
            ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var discussion = await ctx.Discussions.FindAsync(
                new object[] { input.DiscussionId },
                cancellationToken);

            if (discussion is null) throw new DiscussionNotFoundException();

            var message = new Message {
                Content = input.Description?.Trim(),
                DiscussionId = discussion.Id,
                CreatedById = userId,
                IsEvent = true,
                MessageEvent = MessageEvent.CHANGE_DESCRIPTION
            };

            discussion.Messages.Add(message);
            discussion.Description = input.Description?.Trim();
            discussion.UpdatedAt = DateTime.UtcNow;
            await ctx.SaveChangesAsync(cancellationToken);

            await sender.SendAsync(
              "OnDiscussionMessageReceived_" + discussion.Id,
              message.Id,
              cancellationToken);

            return discussion;
        }
    }
}
