using System;
using System.Collections.Generic;
using HotChocolate;
using HotChocolate.Execution;
using HotChocolate.Execution.Instrumentation;
using HotChocolate.Resolvers;
using Microsoft.Extensions.Logging;

namespace API.Extensions {
    // TODO: Configure external logging tools (e.g. NewRelic).
    public class CustomDiagnosticEventListener : ExecutionDiagnosticEventListener {
        private readonly ILogger<CustomDiagnosticEventListener> _logger;

        public CustomDiagnosticEventListener(ILogger<CustomDiagnosticEventListener> logger)
            => _logger = logger ?? throw new ArgumentNullException(nameof(logger));

        public override bool EnableResolveFieldValue => true;

        public override IDisposable ExecuteRequest(IRequestContext context) {
            var start = DateTime.UtcNow;

            // Add basic context to logger that will be recorded with every log entry.
            var basicScopedContextData = GetBasicScopeContextData(context);
            using var scope = _logger.BeginScope(basicScopedContextData);

            // Log the full query when on Information level.
            if (_logger.IsEnabled(LogLevel.Information)) {
                _logger.LogInformation(
                    "Query: {query}\nQueryId: {queryId}\nOperation: {operationName}",
                    context.Request.Query?.ToString() ?? "null",
                    GetQueryId(context) ?? "null",
                    context.Request.OperationName ?? "null");
            }

            return new RequestScope(start, _logger);
        }

        private class RequestScope : IDisposable {
            private readonly DateTime _start;
            private readonly ILogger<CustomDiagnosticEventListener> _logger;

            public RequestScope(DateTime start, ILogger<CustomDiagnosticEventListener> logger) {
                _start = start;
                _logger = logger;
            }

            // This is invoked at the end of the `ExecuteRequest` operation.
            public void Dispose() {
                var end = DateTime.UtcNow;
                var elapsed = end - _start;

                if (_logger.IsEnabled(LogLevel.Information)) {
                    _logger.LogInformation(
                        "Request finished after [{minutes} minutes, {seconds} seconds, {ms} ms]",
                        elapsed.TotalMinutes,
                        elapsed.TotalSeconds,
                        elapsed.TotalMilliseconds);
                }
            }
        }

        public override void TaskError(IExecutionTask task, IError error)
            => LogError(error);

        public override void RequestError(IRequestContext context, Exception exception)
            => _logger.LogError(exception, "A request error has occured!");

        public override void SyntaxError(IRequestContext context, IError error)
            => LogError(error, GetDetailedScopeContextData(context));

        public override void ValidationErrors(
            IRequestContext context,
            IReadOnlyList<IError> errors) {
            foreach (var error in errors) {
                LogError(error, GetDetailedScopeContextData(context));
            }
        }

        public override void ResolverError(IMiddlewareContext context, IError error)
            => LogError(error, GetDetailedScopeContextData(context));

        private void LogError(
            IError error, Dictionary<string, object>? additionalContextData = null) {
            additionalContextData ??= new Dictionary<string, object>();
            additionalContextData.Add("errorPath", error.Path?.Print() ?? "unknown");

            using var scope = _logger.BeginScope(additionalContextData);

            if (error.Exception is null) {
                _logger.LogError(error.Message);
            } else {
                _logger.LogError(error.Exception, error.Message);
            }
        }

        private static Dictionary<string, object> GetBasicScopeContextData(
            IRequestContext requestContext) {
            var data = new Dictionary<string, object>
            {
                { "schemaName", requestContext.Schema.Name.Value },
                { "queryId", GetQueryId(requestContext) ?? "null" },
                { "operationName", requestContext.Operation?.Name?.Value ?? "unnamed" },
            };

            if (requestContext.Request.VariableValues is not null) {
                foreach (var (key, value) in requestContext.Request.VariableValues) {
                    data.Add($"variable[{key}]", value?.ToString() ?? "null");
                }
            }

            return data;
        }

        private static Dictionary<string, object> GetDetailedScopeContextData(
            IRequestContext requestContext) {
            return new Dictionary<string, object>
            {
                { "query", requestContext.Request.Query?.ToString() ?? "null" },
            };
        }

        private static Dictionary<string, object> GetDetailedScopeContextData(
            IMiddlewareContext middlewareContext) {
            return new Dictionary<string, object>
            {
                { "document", middlewareContext.Document.ToString(indented: true) },
            };
        }

        private static string? GetQueryId(IRequestContext requestContext) {
            return
                requestContext.Request.QueryId ??
                requestContext.DocumentId ??
                requestContext.DocumentHash ??
                requestContext.Request.QueryHash;
        }
    }
}
