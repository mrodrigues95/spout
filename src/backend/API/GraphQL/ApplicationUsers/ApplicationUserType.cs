﻿using API.Data;
using API.Data.Entities;
using API.Extensions;
using API.GraphQL.Classrooms;
using HotChocolate;
using HotChocolate.Resolvers;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.GraphQL.ApplicationUsers {
    public class ApplicationUserType : ObjectType<ApplicationUser> {
        protected override void Configure(IObjectTypeDescriptor<ApplicationUser> descriptor) {
            descriptor
                .ImplementsNode()
                .IdField(x => x.Id)
                .ResolveNode((ctx, id) => ctx.DataLoader<ApplicationUserByIdDataLoader>().LoadAsync(id, ctx.RequestAborted));

            descriptor
                .Field(x => x.ClassroomApplicationUsers)
                .ResolveWith<ApplicationUserResolvers>(x => x.GetClassroomsAsync(default!, default!, default!, default!))
                .UseDbContext<ApplicationDbContext>()
                .Name("classrooms");
        }

        private class ApplicationUserResolvers {
            public async Task<IEnumerable<Classroom>> GetClassroomsAsync(
                ApplicationUser applicationUser,
                [ScopedService] ApplicationDbContext dbContext,
                ClassroomByIdDataLoader classroomById,
                CancellationToken cancellationToken) {
                Guid[] classroomIds = await dbContext.ApplicationUsers
                    .Where(au => au.Id == applicationUser.Id)
                    .Include(au => au.ClassroomApplicationUsers)
                    .SelectMany(au => au.ClassroomApplicationUsers.Select(cau => cau.ClassroomId))
                    .ToArrayAsync();

                return await classroomById.LoadAsync(classroomIds, cancellationToken);
            }
        }
    }
}
