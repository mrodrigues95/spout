/**
 * @generated SignedSource<<b30eb955509f05ed39af1170f5c3fcca>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type LoginTwoFactorGeneratTokenMutation$variables = {};
export type LoginTwoFactorGeneratTokenMutationVariables = LoginTwoFactorGeneratTokenMutation$variables;
export type LoginTwoFactorGeneratTokenMutation$data = {
  readonly generateTwoFactorToken: {
    readonly authPayload: {
      readonly isLoggedIn: boolean;
      readonly requiresTwoFactorLogin: boolean;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly message?: string;
    }> | null;
  };
};
export type LoginTwoFactorGeneratTokenMutationResponse = LoginTwoFactorGeneratTokenMutation$data;
export type LoginTwoFactorGeneratTokenMutation = {
  variables: LoginTwoFactorGeneratTokenMutationVariables;
  response: LoginTwoFactorGeneratTokenMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
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
      "kind": "ScalarField",
      "name": "isLoggedIn",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "requiresTwoFactorLogin",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v1 = {
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "LoginTwoFactorGeneratTokenMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GenerateTwoFactorTokenPayload",
        "kind": "LinkedField",
        "name": "generateTwoFactorToken",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              (v1/*: any*/)
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LoginTwoFactorGeneratTokenMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GenerateTwoFactorTokenPayload",
        "kind": "LinkedField",
        "name": "generateTwoFactorToken",
        "plural": false,
        "selections": [
          (v0/*: any*/),
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
              (v1/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f9509f722b8b975884eca7918a6c7981",
    "id": null,
    "metadata": {},
    "name": "LoginTwoFactorGeneratTokenMutation",
    "operationKind": "mutation",
    "text": "mutation LoginTwoFactorGeneratTokenMutation {\n  generateTwoFactorToken {\n    authPayload {\n      isLoggedIn\n      requiresTwoFactorLogin\n    }\n    errors {\n      __typename\n      ... on Error {\n        __isError: __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7c737866dfbce85a4141e70943d1985d";

export default node;
