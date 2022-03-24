/**
 * @generated SignedSource<<a63deabe8ed4b5a942670996bc811e19>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type VerifyEmailInput = {
  token: string;
};
export type VerifyEmailMutation$variables = {
  input: VerifyEmailInput;
};
export type VerifyEmailMutationVariables = VerifyEmailMutation$variables;
export type VerifyEmailMutation$data = {
  readonly verifyEmail: {
    readonly authPayload: {
      readonly user: {
        readonly email: string;
        readonly emailConfirmed: boolean;
      } | null;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly __typename: "InvalidTokenError";
      readonly message: string;
    } | {
      readonly __typename: "EmailAlreadyVerifiedError";
      readonly message: string;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    }> | null;
  };
};
export type VerifyEmailMutationResponse = VerifyEmailMutation$data;
export type VerifyEmailMutation = {
  variables: VerifyEmailMutationVariables;
  response: VerifyEmailMutation$data;
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
},
v6 = [
  (v4/*: any*/),
  (v5/*: any*/)
],
v7 = [
  (v5/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "VerifyEmailMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "VerifyEmailPayload",
        "kind": "LinkedField",
        "name": "verifyEmail",
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
                "selections": (v6/*: any*/),
                "type": "InvalidTokenError",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v6/*: any*/),
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "VerifyEmailMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "VerifyEmailPayload",
        "kind": "LinkedField",
        "name": "verifyEmail",
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
                "selections": (v7/*: any*/),
                "type": "InvalidTokenError",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v7/*: any*/),
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
    "cacheID": "ed8a21da6550a4da4bb641bfdad4e56c",
    "id": null,
    "metadata": {},
    "name": "VerifyEmailMutation",
    "operationKind": "mutation",
    "text": "mutation VerifyEmailMutation(\n  $input: VerifyEmailInput!\n) {\n  verifyEmail(input: $input) {\n    authPayload {\n      user {\n        email\n        emailConfirmed\n        id\n      }\n    }\n    errors {\n      __typename\n      ... on InvalidTokenError {\n        __typename\n        message\n      }\n      ... on EmailAlreadyVerifiedError {\n        __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2f6343e2f57f731d80ec3da93126e736";

export default node;
