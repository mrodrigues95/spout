using API.Data.Entities;
using HotChocolate.Types.Relay;

namespace API.Schema.Mutations.Files {
    public record CompleteUploadInput([property: ID(nameof(File))] int FileId);
}
