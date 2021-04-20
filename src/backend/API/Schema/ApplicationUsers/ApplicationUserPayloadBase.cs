using API.Common;
using API.Data.Entities;
using System.Collections.Generic;

namespace API.Schema.ApplicationUsers {
    public class ApplicationUserPayloadBase : Payload {
        public ApplicationUser? ApplicationUser { get; }

        protected ApplicationUserPayloadBase(ApplicationUser applicationUser) {
            ApplicationUser = applicationUser;
        }

        protected ApplicationUserPayloadBase(IReadOnlyList<UserError> errors) : base(errors) { }
    }
}
