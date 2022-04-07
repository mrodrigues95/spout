/**
 * @generated SignedSource<<dd0af778bca6aa418b8b65b77c8c6f14>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ActivityQuery$variables = {
  id: string;
};
export type ActivityQueryVariables = ActivityQuery$variables;
export type ActivityQuery$data = {
  readonly classroomById: {
    readonly name: string;
    readonly createdAt: string;
  };
};
export type ActivityQueryResponse = ActivityQuery$data;
export type ActivityQuery = {
  variables: ActivityQueryVariables;
  response: ActivityQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ActivityQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Classroom",
        "kind": "LinkedField",
        "name": "classroomById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ActivityQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Classroom",
        "kind": "LinkedField",
        "name": "classroomById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "656cc410d3e34e739355703d8f379a34",
    "id": null,
    "metadata": {},
    "name": "ActivityQuery",
    "operationKind": "query",
    "text": "query ActivityQuery(\n  $id: ID!\n) {\n  classroomById(id: $id) {\n    name\n    createdAt\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "e4d6716ed5b069dbcf84f0b763770f22";

export default node;
