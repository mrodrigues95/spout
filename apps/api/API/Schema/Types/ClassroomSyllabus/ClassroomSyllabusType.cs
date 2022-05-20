using HotChocolate.Types;
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
                .Field(cs => cs.ClassroomId)
                .Ignore();
        }
    }
}
