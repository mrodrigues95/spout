/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type testmeQueryVariables = {};
export type testmeQueryResponse = {
    readonly classrooms: ReadonlyArray<{
        readonly id: string;
    }>;
};
export type testmeQuery = {
    readonly response: testmeQueryResponse;
    readonly variables: testmeQueryVariables;
};



/*
query testmeQuery {
  classrooms {
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Classroom",
    "kind": "LinkedField",
    "name": "classrooms",
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
    "name": "testmeQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "testmeQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "373ccf87276d1d87b46e0c2564e2af00",
    "id": null,
    "metadata": {},
    "name": "testmeQuery",
    "operationKind": "query",
    "text": "query testmeQuery {\n  classrooms {\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'dd50d085393146cddae809f9fc6e5e07';
export default node;
