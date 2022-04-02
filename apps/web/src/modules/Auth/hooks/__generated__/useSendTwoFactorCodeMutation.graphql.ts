/**
 * @generated SignedSource<<093f2a495aef090e644a9b8aa4905c42>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type useSendTwoFactorCodeMutation$variables = {};
export type useSendTwoFactorCodeMutationVariables = useSendTwoFactorCodeMutation$variables;
export type useSendTwoFactorCodeMutation$data = {
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
export type useSendTwoFactorCodeMutationResponse = useSendTwoFactorCodeMutation$data;
export type useSendTwoFactorCodeMutation = {
  variables: useSendTwoFactorCodeMutationVariables;
  response: useSendTwoFactorCodeMutation$data;
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
    "name": "useSendTwoFactorCodeMutation",
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
    "name": "useSendTwoFactorCodeMutation",
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
    "cacheID": "f9fd24c35610a03da316aec21e21d25f",
    "id": null,
    "metadata": {},
    "name": "useSendTwoFactorCodeMutation",
    "operationKind": "mutation",
    "text": "mutation useSendTwoFactorCodeMutation {\n  generateTwoFactorToken {\n    authPayload {\n      isLoggedIn\n      requiresTwoFactorLogin\n    }\n    errors {\n      __typename\n      ... on Error {\n        __isError: __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ace9cd28e4d7e0637d545ce74edaa1c7";

export default node;
