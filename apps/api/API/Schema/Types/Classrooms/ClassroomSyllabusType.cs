using API.Data.Entities;
using HotChocolate.Types;

namespace API.Schema.Types.Classrooms {
    public class ClassroomSyllabusType : ObjectType<ClassroomSyllabus> {
        protected override void Configure(IObjectTypeDescriptor<ClassroomSyllabus> descriptor) {
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
                 .Field(c => c.CreatedAt)
                 .Type<NonNullType<DateTimeType>>();

            descriptor
                .Field(c => c.UpdatedAt)
                .Type<NonNullType<DateTimeType>>();

            descriptor
                .Field(cs => cs.ClassroomId)
                .Ignore();
        }
    }
}
