/**
 * @generated SignedSource<<3b36cf8fa7ac7e6d10349e2cfb43c0ff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type VerifyEmailGenerateEmailVerificationTokenMutation$variables = {};
export type VerifyEmailGenerateEmailVerificationTokenMutationVariables = VerifyEmailGenerateEmailVerificationTokenMutation$variables;
export type VerifyEmailGenerateEmailVerificationTokenMutation$data = {
  readonly generateEmailVerificationToken: {
    readonly errors: ReadonlyArray<{
      readonly __typename: "EmailAlreadyVerifiedError";
      readonly message: string;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    }> | null;
  };
};
export type VerifyEmailGenerateEmailVerificationTokenMutationResponse = VerifyEmailGenerateEmailVerificationTokenMutation$data;
export type VerifyEmailGenerateEmailVerificationTokenMutation = {
  variables: VerifyEmailGenerateEmailVerificationTokenMutationVariables;
  response: VerifyEmailGenerateEmailVerificationTokenMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "VerifyEmailGenerateEmailVerificationTokenMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GenerateEmailVerificationTokenPayload",
        "kind": "LinkedField",
        "name": "generateEmailVerificationToken",
        "plural": false,
        "selections": [
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
                  (v0/*: any*/),
                  (v1/*: any*/)
                ],
                "type": "EmailAlreadyVerifiedError",
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "VerifyEmailGenerateEmailVerificationTokenMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GenerateEmailVerificationTokenPayload",
        "kind": "LinkedField",
        "name": "generateEmailVerificationToken",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v1/*: any*/)
                ],
                "type": "EmailAlreadyVerifiedError",
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
    "cacheID": "ff7fc6a905837e2c8b329bd78aed83a0",
    "id": null,
    "metadata": {},
    "name": "VerifyEmailGenerateEmailVerificationTokenMutation",
    "operationKind": "mutation",
    "text": "mutation VerifyEmailGenerateEmailVerificationTokenMutation {\n  generateEmailVerificationToken {\n    errors {\n      __typename\n      ... on EmailAlreadyVerifiedError {\n        __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "da8b01d7bf0c556c87de50086424a245";

export default node;
