/**
 * @generated SignedSource<<6fc3321e78937cba230982f1034cf9f6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type sessionsQuery$variables = {
  id: string;
  now: string;
};
export type sessionsQueryVariables = sessionsQuery$variables;
export type sessionsQuery$data = {
  readonly sessions: ReadonlyArray<{
    readonly id: string;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly expiresAt: string;
  }>;
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
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "now"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "fields": [
              {
                "kind": "Variable",
                "name": "gte",
                "variableName": "now"
              }
            ],
            "kind": "ObjectValue",
            "name": "expiresAt"
          },
          {
            "fields": [
              {
                "kind": "Variable",
                "name": "eq",
                "variableName": "id"
              }
            ],
            "kind": "ObjectValue",
            "name": "id"
          }
        ],
        "kind": "ObjectValue",
        "name": "where"
      }
    ],
    "concreteType": "Session",
    "kind": "LinkedField",
    "name": "sessions",
    "plural": true,
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
    "cacheID": "d82375290f0574b489c54eb8d38e519f",
    "id": null,
    "metadata": {},
    "name": "sessionsQuery",
    "operationKind": "query",
    "text": "query sessionsQuery(\n  $id: ID!\n  $now: DateTime!\n) {\n  sessions(where: {id: {eq: $id}, expiresAt: {gte: $now}}) {\n    id\n    createdAt\n    updatedAt\n    expiresAt\n  }\n}\n"
  }
};
})();

(node as any).hash = "055ca5997c59850c7844905186926be3";

export default node;
