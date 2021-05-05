using HotChocolate.AspNetCore.Serialization;
using HotChocolate.Execution;
using System.Linq;
using System.Net;

namespace API.Common.Exceptions {
    public class GraphQLHttpResultSerializer : DefaultHttpResultSerializer {
        private ErrorFilter ErrorFilter { get; }

        public GraphQLHttpResultSerializer(ErrorFilter filter) {
            ErrorFilter = filter;
        }

        public override HttpStatusCode GetStatusCode(IExecutionResult result) {
            if (result.Errors?.Any() ?? false) {
                return ErrorFilter.GetHighestErrorCode(result.Errors.Select(e => e.Code));
            }

            return base.GetStatusCode(result);
        }
    }
}
