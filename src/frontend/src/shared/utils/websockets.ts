import { WebSocketLink } from '@apollo/client/link/ws';

// TODO: This should use the graphql-ws instead once Hot Chocolate
// implements support for graphql-ws.
export const createWSLink = () => {
  return new WebSocketLink({
    uri: 'ws://spout.localhost/api/graphql',
    options: {
      reconnect: true,
      lazy: true,
    }
  });
};

// class WebSocketLink extends ApolloLink {
//   private client: Client;

//   constructor(options: ClientOptions) {
//     super();
//     this.client = createClient(options);
//   }

//   public request(operation: Operation): Observable<FetchResult> {
//     return new Observable((sink) => {
//       return this.client.subscribe<FetchResult>(
//         { ...operation, query: print(operation.query) },
//         {
//           next: sink.next.bind(sink),
//           complete: sink.complete.bind(sink),
//           error: (err) => {
//             if (err instanceof Error) {
//               return sink.error(err);
//             }

//             if (err instanceof CloseEvent) {
//               return sink.error(
//                 new Error(
//                   `Socket closed with event ${err.code} ${err.reason || ''}`
//                 )
//               );
//             }

//             return sink.error(
//               new Error(
//                 (err as GraphQLError[]).map(({ message }) => message).join(', ')
//               )
//             );
//           },
//         }
//       );
//     });
//   }
// }

// export const createWSLink = () => {
//   return new WebSocketLink({
//     url: 'ws://spout.localhost/api/graphql',
//     webSocketImpl: typeof window === 'undefined' ? ws.client : WebSocket
//   });
// };
