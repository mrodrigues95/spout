/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type testQueryVariables = {};
export type testQueryResponse = {
    readonly users: ReadonlyArray<{
        readonly id: string;
    }>;
};
export type testQuery = {
    readonly response: testQueryResponse;
    readonly variables: testQueryVariables;
};



/*
query testQuery {
  users {
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "users",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "testQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "testQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "1aeb2e112f227bca766c6af8b5af92f4",
    "id": null,
    "metadata": {},
    "name": "testQuery",
    "operationKind": "query",
    "text": "query testQuery {\n  users {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '6c87cc99f8544602510039e67eba3a40';
export default node;
