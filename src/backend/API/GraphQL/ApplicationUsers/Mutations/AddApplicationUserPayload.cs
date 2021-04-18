using API.Common;
using API.Data.Entities;
using System.Collections.Generic;

namespace API.GraphQL.ApplicationUsers {
    public class AddApplicationUserPayload : ApplicationUserPayloadBase {
        public AddApplicationUserPayload(ApplicationUser applicationUser) : base(applicationUser) { }
        public AddApplicationUserPayload(IReadOnlyList<UserError> errors) : base(errors) { }
    }
}
