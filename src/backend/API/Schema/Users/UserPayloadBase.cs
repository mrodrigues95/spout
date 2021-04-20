using API.Common;
using API.Data.Entities;
using System.Collections.Generic;

namespace API.Schema.Users {
    public class UserPayloadBase : Payload {
        public User? User { get; }

        protected UserPayloadBase(User user) {
            User = user;
        }

        protected UserPayloadBase(IReadOnlyList<UserError> errors) : base(errors) { }
    }
}
