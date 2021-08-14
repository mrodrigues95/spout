using API.Extensions;
using HotChocolate.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Schema.Entities.Invite {
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class InviteMutations {
        // Flow:
        // 1. If validate token is passed in payload:
        //      1) Get the token from db
        //      2) validate uses < maxUses, and it isn't expired
        //      3) if valid, return same token
        //      4) if not valid, mark IsValid = false, generate a new invite code
        // 2. If validate token is NOT passed in payload:
        //      1) Query db and get all of the invites that belong to this user for this classroom AND is valid
        //      2) If results are returned, return the invite
        //      3) If no results are returned, generate a new invite code


        //[UseApplicationDbContext]
        //public async Task<SendDiscussionMessagePayload> CreateInviteAsync(
        //    SendDiscussionMessageInput input,
        //    [GlobalState] int userId,
        //    [Service] ITopicEventSender sender,
        //    [ScopedService] ApplicationDbContext context,
        //    CancellationToken cancellationToken) {
        //    // 


        //    var discussion = await context.Discussions.FindAsync(input.DiscussionId);
        //    if (discussion is null) {
        //        return new SendDiscussionMessagePayload(new UserError("Discussion not found", "DISCUSSION_NOT_FOUND"));
        //    }

        //    var message = new Entity.Message {
        //        Body = input.Body,
        //        DiscussionId = input.DiscussionId,
        //        CreatedById = userId
        //    };

        //    discussion.Messages.Add(message);
        //    await context.SaveChangesAsync(cancellationToken);

        //    await sender.SendAsync("OnDiscussionMessageReceived_" + input.DiscussionId, message.Id, cancellationToken);

        //    return new SendDiscussionMessagePayload(message);
        //}
    }
}
