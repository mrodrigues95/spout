using API.Data.Entities;
using Enums = API.Common.Enums;
using HotChocolate.Types;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Subscriptions;
using API.Extensions;
using API.Data;
using System.Threading;
using HotChocolate.AspNetCore.Authorization;
using System;
using API.Schema.Mutations.Discussions.Exceptions;
using API.Schema.Mutations.Discussions.Inputs;
using Microsoft.EntityFrameworkCore;
using API.Schema.Types.Messages;

namespace API.Schema.Mutations.Discussions {
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class DiscussionMutations {
        [Authorize]
        [UseApplicationDbContext]
        [Error(typeof(DiscussionNotFoundException))]
        public async Task<Message?> SendDiscussionMessageAsync(
            SendDiscussionMessageInput input,
            [GlobalState] int userId,
            [Service] ITopicEventSender sender,
            [ScopedService] ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var discussion = await ctx.Discussions.FindAsync(
                new object[] { input.DiscussionId },
                cancellationToken);

            if (discussion is null) {
                throw new DiscussionNotFoundException();
            }

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
        [UseApplicationDbContext]
        [Error(typeof(DiscussionMessageNotFoundException))]
        public async Task<Message?> UpdateDiscussionMessageAsync(
            UpdateDiscussionMessageInput input,
            [ScopedService] ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var message = await ctx.Messages.FindAsync(
                new object[] { input.MessageId },
                cancellationToken);

            if (message is null) {
                throw new DiscussionMessageNotFoundException();
            }

            message.Content = input.Content;
            message.UpdatedAt = DateTime.UtcNow;
            await ctx.SaveChangesAsync(cancellationToken);

            return message;
        }

        [Authorize]
        [UseApplicationDbContext]
        [Error(typeof(DiscussionMessageNotFoundException))]
        [Error(typeof(DiscussionMessageAlreadyPinnedException))]
        public async Task<Message?> PinDiscussionMessageAsync(
            PinDiscussionMessageInput input,
            [GlobalState] int userId,
            [Service] ITopicEventSender sender,
            [ScopedService] ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var message = await ctx.Messages
                .Include(m => m.Discussion)
                .SingleOrDefaultAsync(m => m.Id == input.MessageId, cancellationToken);

            if (message is null) {
                throw new DiscussionMessageNotFoundException();
            }

            if (message.PinnedById is not null) {
                throw new DiscussionMessageAlreadyPinnedException();
            }
            
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
        [UseApplicationDbContext]
        [Error(typeof(DiscussionMessageNotFoundException))]
        [Error(typeof(DiscussionMessageAlreadyNotPinnedException))]
        public async Task<Message?> UnpinDiscussionMessageAsync(
            UnpinDiscussionMessageInput input,
            [GlobalState] int userId,
            [Service] ITopicEventSender sender,
            [ScopedService] ApplicationDbContext ctx,
            CancellationToken cancellationToken) {
            var message = await ctx.Messages
                .Include(m => m.Discussion)
                .SingleOrDefaultAsync(m => m.Id == input.MessageId, cancellationToken);

            if (message is null) {
                throw new DiscussionMessageNotFoundException();
            }

            if (message.PinnedById is null) {
                throw new DiscussionMessageAlreadyNotPinnedException();
            }

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
        [UseApplicationDbContext]
        [Error(typeof(ClassroomNotFoundException))]
        public async Task<Discussion?> CreateDiscussionAsync(
            CreateDiscussionInput input,
            [GlobalState] int userId,
            [ScopedService] ApplicationDbContext ctx,
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
        [UseApplicationDbContext]
        [Error(typeof(DiscussionNotFoundException))]
        public async Task<Discussion?> UpdateDiscussionTopicAsync(
        UpdateDiscussionTopicInput input,
        [GlobalState] int userId,
        [Service] ITopicEventSender sender,
        [ScopedService] ApplicationDbContext ctx,
        CancellationToken cancellationToken) {
            var discussion = await ctx.Discussions.FindAsync(
                new object[] { input.DiscussionId },
                cancellationToken);

            if (discussion is null) {
                throw new DiscussionNotFoundException();
            }

            var eventMessage = new Message {
                Content = input.Topic.Trim(),
                DiscussionId = discussion.Id,
                CreatedById = userId,
                IsEvent = true,
                MessageEvent = MessageEvent.CHANGE_TOPIC
            };

            discussion.Messages.Add(eventMessage);
            discussion.Topic = input.Topic.Trim();
            discussion.UpdatedAt = DateTime.UtcNow;
            await ctx.SaveChangesAsync(cancellationToken);

            await sender.SendAsync(
              "OnDiscussionMessageReceived_" + discussion.Id,
              eventMessage.Id,
              cancellationToken);

            return discussion;
        }

        [Authorize]
        [UseApplicationDbContext]
        [Error(typeof(DiscussionNotFoundException))]
        public async Task<Discussion?> UpdateDiscussionDescriptionAsync(
        UpdateDiscussionDescriptionInput input,
        [GlobalState] int userId,
        [Service] ITopicEventSender sender,
        [ScopedService] ApplicationDbContext ctx,
        CancellationToken cancellationToken) {
            var discussion = await ctx.Discussions.FindAsync(
                new object[] { input.DiscussionId },
                cancellationToken);

            if (discussion is null) {
                throw new DiscussionNotFoundException();
            }

            var message = new Message {
                Content = input.Description.Trim(),
                DiscussionId = discussion.Id,
                CreatedById = userId,
                IsEvent = true,
                MessageEvent = MessageEvent.CHANGE_DESCRIPTION
            };

            discussion.Messages.Add(message);
            discussion.Description = input.Description.Trim();
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
