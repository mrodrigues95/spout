using System.Collections.Generic;

namespace API.Common {
    public abstract class Payload {
        protected Payload(IReadOnlyList<UserError>? errors = null) {
            Errors = errors;
        }

        public IReadOnlyList<UserError>? Errors { get; }
    }
}
