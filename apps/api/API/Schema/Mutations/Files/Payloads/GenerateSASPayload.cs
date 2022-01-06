using System;
using API.Data.Entities;

namespace API.Schema.Mutations.Files.Payloads {
    public record GenerateSASPayload(File File, Uri Sas);
}
