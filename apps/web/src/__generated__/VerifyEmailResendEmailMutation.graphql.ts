/**
 * @generated SignedSource<<9fdd1b35e9d647b3b080cba9b07bd4df>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type VerifyEmailResendEmailMutation$variables = {};
export type VerifyEmailResendEmailMutationVariables = VerifyEmailResendEmailMutation$variables;
export type VerifyEmailResendEmailMutation$data = {
  readonly generateEmailVerificationToken: {
    readonly authPayload: {
      readonly user: {
        readonly email: string;
      } | null;
    } | null;
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
export type VerifyEmailResendEmailMutationResponse = VerifyEmailResendEmailMutation$data;
export type VerifyEmailResendEmailMutation = {
  variables: VerifyEmailResendEmailMutationVariables;
  response: VerifyEmailResendEmailMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v2 = {
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
    "name": "VerifyEmailResendEmailMutation",
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
                  (v0/*: any*/)
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
                  (v1/*: any*/),
                  (v2/*: any*/)
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
    "name": "VerifyEmailResendEmailMutation",
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
                  (v0/*: any*/),
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
              (v1/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/)
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
    "cacheID": "726dfcd7c8120dc6ac29ec1300b211f6",
    "id": null,
    "metadata": {},
    "name": "VerifyEmailResendEmailMutation",
    "operationKind": "mutation",
    "text": "mutation VerifyEmailResendEmailMutation {\n  generateEmailVerificationToken {\n    authPayload {\n      user {\n        email\n        id\n      }\n    }\n    errors {\n      __typename\n      ... on EmailAlreadyVerifiedError {\n        __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2739152bcb1273a3c5cb2411d719d218";

export default node;
