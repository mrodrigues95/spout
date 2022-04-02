/**
 * @generated SignedSource<<67e74ac141696fcea586384c6616fdd8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type GenerateChangeEmailTokenInput = {
  newEmail: string;
  password: string;
};
export type ChangeEmailGenerateTokenMutation$variables = {
  input: GenerateChangeEmailTokenInput;
};
export type ChangeEmailGenerateTokenMutationVariables = ChangeEmailGenerateTokenMutation$variables;
export type ChangeEmailGenerateTokenMutation$data = {
  readonly generateChangeEmailToken: {
    readonly authPayload: {
      readonly user: {
        readonly email: string;
        readonly emailConfirmed: boolean;
      } | null;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly __typename: "IncorrectCurrentPasswordError";
      readonly message: string;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    }> | null;
  };
};
export type ChangeEmailGenerateTokenMutationResponse = ChangeEmailGenerateTokenMutation$data;
export type ChangeEmailGenerateTokenMutation = {
  variables: ChangeEmailGenerateTokenMutationVariables;
  response: ChangeEmailGenerateTokenMutation$data;
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
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "emailConfirmed",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChangeEmailGenerateTokenMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GenerateChangeEmailTokenPayload",
        "kind": "LinkedField",
        "name": "generateChangeEmailToken",
        "plural": false,
        "selections": [
          {
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
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "user",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
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
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/)
                ],
                "type": "IncorrectCurrentPasswordError",
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
    "name": "ChangeEmailGenerateTokenMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GenerateChangeEmailTokenPayload",
        "kind": "LinkedField",
        "name": "generateChangeEmailToken",
        "plural": false,
        "selections": [
          {
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
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "user",
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
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              (v4/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v5/*: any*/)
                ],
                "type": "IncorrectCurrentPasswordError",
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
    "cacheID": "5ba0a6e46c53b2aad8f2bfe251ed6b6b",
    "id": null,
    "metadata": {},
    "name": "ChangeEmailGenerateTokenMutation",
    "operationKind": "mutation",
    "text": "mutation ChangeEmailGenerateTokenMutation(\n  $input: GenerateChangeEmailTokenInput!\n) {\n  generateChangeEmailToken(input: $input) {\n    authPayload {\n      user {\n        email\n        emailConfirmed\n        id\n      }\n    }\n    errors {\n      __typename\n      ... on IncorrectCurrentPasswordError {\n        __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "bddf6b4a9e56f4f2e19207e7df6643d0";

export default node;
