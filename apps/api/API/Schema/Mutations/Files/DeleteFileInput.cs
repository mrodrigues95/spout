using API.Data.Entities;
using HotChocolate.Types.Relay;

namespace API.Schema.Mutations.Files {
    public record DeleteFileInput([property: ID(nameof(File))] int FileId);
}
