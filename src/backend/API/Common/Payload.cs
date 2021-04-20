using System.Collections.Generic;

namespace API.Common {
    public abstract class Payload {
        public IReadOnlyList<UserError>? Errors { get; }

        protected Payload(IReadOnlyList<UserError>? errors = null) {
            Errors = errors;
        }
    }
}
