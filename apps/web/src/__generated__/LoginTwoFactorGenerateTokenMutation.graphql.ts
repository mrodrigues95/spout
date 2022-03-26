/**
 * @generated SignedSource<<a5bfcb819f1c98bd2c2f628c2fdbf0cb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type LoginTwoFactorGenerateTokenMutation$variables = {};
export type LoginTwoFactorGenerateTokenMutationVariables = LoginTwoFactorGenerateTokenMutation$variables;
export type LoginTwoFactorGenerateTokenMutation$data = {
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
export type LoginTwoFactorGenerateTokenMutationResponse = LoginTwoFactorGenerateTokenMutation$data;
export type LoginTwoFactorGenerateTokenMutation = {
  variables: LoginTwoFactorGenerateTokenMutationVariables;
  response: LoginTwoFactorGenerateTokenMutation$data;
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
    "name": "LoginTwoFactorGenerateTokenMutation",
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
    "name": "LoginTwoFactorGenerateTokenMutation",
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
    "cacheID": "188944a789a49ef63012363a915b236c",
    "id": null,
    "metadata": {},
    "name": "LoginTwoFactorGenerateTokenMutation",
    "operationKind": "mutation",
    "text": "mutation LoginTwoFactorGenerateTokenMutation {\n  generateTwoFactorToken {\n    authPayload {\n      isLoggedIn\n      requiresTwoFactorLogin\n    }\n    errors {\n      __typename\n      ... on Error {\n        __isError: __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "977887b80bcea81bcfc36717032deccf";

export default node;
