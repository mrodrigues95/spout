using System.Collections.Generic;

namespace API.Schema.Common {
    public abstract class Payload {
        public IReadOnlyList<UserError>? UserErrors { get; }

        protected Payload(IReadOnlyList<UserError>? errors = null) {
            UserErrors = errors;
        }
    }
}
