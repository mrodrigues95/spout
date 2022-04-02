/**
 * @generated SignedSource<<009ff686c989cb6256e86daf0cebb8af>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type VerifyTwoFactorTokenInput = {
  token: string;
};
export type LoginTwoFactorVerifyTokenMutation$variables = {
  input: VerifyTwoFactorTokenInput;
};
export type LoginTwoFactorVerifyTokenMutationVariables = LoginTwoFactorVerifyTokenMutation$variables;
export type LoginTwoFactorVerifyTokenMutation$data = {
  readonly verifyTwoFactorToken: {
    readonly authPayload: {
      readonly isLoggedIn: boolean;
      readonly requiresTwoFactorLogin: boolean;
      readonly session: {
        readonly id: string;
      } | null;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly __typename: "LoginUserError";
      readonly message: string;
    } | {
      readonly __typename: "InvalidTokenError";
      readonly message: string;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    }> | null;
  };
};
export type LoginTwoFactorVerifyTokenMutationResponse = LoginTwoFactorVerifyTokenMutation$data;
export type LoginTwoFactorVerifyTokenMutation = {
  variables: LoginTwoFactorVerifyTokenMutationVariables;
  response: LoginTwoFactorVerifyTokenMutation$data;
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
    },
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
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v5 = [
  (v3/*: any*/),
  (v4/*: any*/)
],
v6 = [
  (v4/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LoginTwoFactorVerifyTokenMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "VerifyTwoFactorTokenPayload",
        "kind": "LinkedField",
        "name": "verifyTwoFactorToken",
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
                "kind": "InlineFragment",
                "selections": (v5/*: any*/),
                "type": "LoginUserError",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v5/*: any*/),
                "type": "InvalidTokenError",
                "abstractKey": null
              }
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
    "name": "LoginTwoFactorVerifyTokenMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "VerifyTwoFactorTokenPayload",
        "kind": "LinkedField",
        "name": "verifyTwoFactorToken",
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
              (v3/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v6/*: any*/),
                "type": "LoginUserError",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v6/*: any*/),
                "type": "InvalidTokenError",
                "abstractKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "bd7d915f06bd718abcac40a305fc1b3b",
    "id": null,
    "metadata": {},
    "name": "LoginTwoFactorVerifyTokenMutation",
    "operationKind": "mutation",
    "text": "mutation LoginTwoFactorVerifyTokenMutation(\n  $input: VerifyTwoFactorTokenInput!\n) {\n  verifyTwoFactorToken(input: $input) {\n    authPayload {\n      isLoggedIn\n      requiresTwoFactorLogin\n      session {\n        id\n      }\n    }\n    errors {\n      __typename\n      ... on LoginUserError {\n        __typename\n        message\n      }\n      ... on InvalidTokenError {\n        __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "330ba4b8e5db6d67409ce7c35e6bd825";

export default node;
