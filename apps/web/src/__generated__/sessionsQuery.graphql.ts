/**
 * @generated SignedSource<<5987f3dbd82b8399778c9abdb7efb55c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type sessionsQuery$variables = {
  id: string;
};
export type sessionsQueryVariables = sessionsQuery$variables;
export type sessionsQuery$data = {
  readonly sessionById: {
    readonly id: string;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly expiresAt: string;
  };
};
export type sessionsQueryResponse = sessionsQuery$data;
export type sessionsQuery = {
  variables: sessionsQueryVariables;
  response: sessionsQuery$data;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Session",
    "kind": "LinkedField",
    "name": "sessionById",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "createdAt",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "updatedAt",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "expiresAt",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "sessionsQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "sessionsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "246006108c0d5477c03c20def198a02b",
    "id": null,
    "metadata": {},
    "name": "sessionsQuery",
    "operationKind": "query",
    "text": "query sessionsQuery(\n  $id: ID!\n) {\n  sessionById(id: $id) {\n    id\n    createdAt\n    updatedAt\n    expiresAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "300d93429f25153f7122b1368fffe7bb";

export default node;
