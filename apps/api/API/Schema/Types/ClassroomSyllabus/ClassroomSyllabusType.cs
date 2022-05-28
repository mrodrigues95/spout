using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using API.Data;
using API.Data.Entities;
using API.Schema.Queries.Files;
using API.Schema.Types.Files;
using HotChocolate;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Entities = API.Data.Entities;

namespace API.Schema.Types.ClassroomSyllabus {
    public class ClassroomSyllabusType : ObjectType<Entities.ClassroomSyllabus> {
        protected override void Configure(IObjectTypeDescriptor<Entities.ClassroomSyllabus> descriptor) {
            descriptor
                .Field(cs => cs.Id)
                .Type<NonNullType<IntType>>();

            descriptor
                .Field(cs => cs.Guid)
                .Type<NonNullType<UuidType>>();

            descriptor
                .Field(cs => cs.Content)
                .Type<NonNullType<StringType>>();

            descriptor
                 .Field(cs => cs.CreatedAt)
                 .Type<NonNullType<DateTimeType>>();

            descriptor
                .Field(cs => cs.UpdatedAt)
                .Type<NonNullType<DateTimeType>>();

            descriptor
                .Field(cs => cs.Files)
                .Type<NonNullType<ListType<NonNullType<FileType>>>>()
                .UseDbContext<ApplicationDbContext>()
                .ResolveWith<ClassroomSyllabusResolvers>(x =>
                    x.GetAttachmentsAsync(default!, default!, default!, default!))
                .Name("attachments");

            descriptor
                .Field(cs => cs.ClassroomId)
                .Ignore();
        }

        private class ClassroomSyllabusResolvers {
            public async Task<IEnumerable<File>> GetAttachmentsAsync(
                [Parent] Entities.ClassroomSyllabus syllabus,
                ApplicationDbContext ctx,
                FileByIdDataLoader fileById,
                CancellationToken cancellationToken) {
                int[] fileIds = await ctx.ClassroomSyllabusFiles
                    .Where(csf => csf.ClassroomSyllabusId == syllabus.Id &&
                        !csf.File!.IsDeleted &&
                        csf.File!.UploadStatus == FileUploadStatus.COMPLETED)
                    .Select(csf => csf.FileId)
                    .ToArrayAsync(cancellationToken);

                return await fileById.LoadAsync(fileIds, cancellationToken);
            }
        }
    }
}
