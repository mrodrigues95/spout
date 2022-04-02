/**
 * @generated SignedSource<<4104d4180a9fe1978b55081a7fcfd9b5>>
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
        readonly emailConfirmed: boolean;
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
  "name": "emailConfirmed",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
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
                  (v0/*: any*/),
                  (v1/*: any*/)
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
                  (v2/*: any*/),
                  (v3/*: any*/)
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
                  (v1/*: any*/),
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
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v3/*: any*/)
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
    "cacheID": "57f5bd624f82f4c1d0880d70a2787e25",
    "id": null,
    "metadata": {},
    "name": "VerifyEmailResendEmailMutation",
    "operationKind": "mutation",
    "text": "mutation VerifyEmailResendEmailMutation {\n  generateEmailVerificationToken {\n    authPayload {\n      user {\n        email\n        emailConfirmed\n        id\n      }\n    }\n    errors {\n      __typename\n      ... on EmailAlreadyVerifiedError {\n        __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "66e70cffc9aa3d1942aa7fc3218414ad";

export default node;
