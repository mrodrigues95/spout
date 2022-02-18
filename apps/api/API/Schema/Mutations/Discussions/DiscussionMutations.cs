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
using API.Schema.Types.Discussions;
using System;
using API.Schema.Mutations.Discussions.Exceptions;
using API.Schema.Mutations.Discussions.Inputs;
using Microsoft.EntityFrameworkCore;

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
                IsDiscussionEvent = false
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
        public async Task<Message?> PinOrUnpinDiscussionMessageAsync(
            PinOrUnpinDiscussionMessageInput input,
            [ScopedService] ApplicationDbContext ctx,
            [GlobalState] int userId,
            CancellationToken cancellationToken) {
            var message = await ctx.Messages.FindAsync(
                new object[] { input.MessageId },
                cancellationToken);

            if (message is null) {
                throw new DiscussionMessageNotFoundException();
            }

            // Toggle pinned.
            if (message.PinnedById is null) {
                message.PinnedById = userId;
            } else {
                message.PinnedById = null;
            }

            message.UpdatedAt = DateTime.UtcNow;
            await ctx.SaveChangesAsync(cancellationToken);

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

            return discussion;
        }
    }
}
