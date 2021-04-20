using API.Common;
using API.Data.Entities;
using System.Collections.Generic;

namespace API.Schema.Users {
    public class CreateUserPayload : UserPayloadBase {
        public CreateUserPayload(User user) : base(user) { }
        public CreateUserPayload(IReadOnlyList<UserError> errors) : base(errors) { }
    }
}
