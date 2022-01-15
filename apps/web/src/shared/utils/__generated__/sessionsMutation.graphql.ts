/**
 * @generated SignedSource<<65a06ce61ce30c11c7d92dca91dd59b2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RefreshSessionInput = {
  sessionId: string;
};
export type sessionsMutation$variables = {
  input: RefreshSessionInput;
};
export type sessionsMutationVariables = sessionsMutation$variables;
export type sessionsMutation$data = {
  readonly refreshSession: {
    readonly authPayload: {
      readonly session: {
        readonly id: string;
        readonly createdAt: string;
        readonly updatedAt: string;
        readonly expiresAt: string;
      } | null;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly message?: string;
    }> | null;
  };
};
export type sessionsMutationResponse = sessionsMutation$data;
export type sessionsMutation = {
  variables: sessionsMutationVariables;
  response: sessionsMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "AuthPayload",
  "kind": "LinkedField",
  "name": "authPayload",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Session",
      "kind": "LinkedField",
      "name": "session",
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
  ],
  "storageKey": null
},
v3 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "message",
      "storageKey": null
    }
  ],
  "type": "Error",
  "abstractKey": "__isError"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "sessionsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RefreshSessionPayload",
        "kind": "LinkedField",
        "name": "refreshSession",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "sessionsMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RefreshSessionPayload",
        "kind": "LinkedField",
        "name": "refreshSession",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c0ed22671864e393eac53dd56e67b8fd",
    "id": null,
    "metadata": {},
    "name": "sessionsMutation",
    "operationKind": "mutation",
    "text": "mutation sessionsMutation(\n  $input: RefreshSessionInput!\n) {\n  refreshSession(input: $input) {\n    authPayload {\n      session {\n        id\n        createdAt\n        updatedAt\n        expiresAt\n      }\n    }\n    errors {\n      __typename\n      ... on Error {\n        __isError: __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "68eb7fd8637bfb7ae651485be7273f62";

export default node;
