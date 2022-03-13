/**
 * @generated SignedSource<<9910b4f31d6235f9bed90667a97d7fe0>>
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
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v4 = [
  (v2/*: any*/),
  (v3/*: any*/)
],
v5 = [
  (v3/*: any*/)
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
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": (v4/*: any*/),
                "type": "InvalidTokenError",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v4/*: any*/),
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
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v5/*: any*/),
                "type": "InvalidTokenError",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v5/*: any*/),
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
    "cacheID": "5be644a770e0f904747087edc6ad133f",
    "id": null,
    "metadata": {},
    "name": "VerifyEmailMutation",
    "operationKind": "mutation",
    "text": "mutation VerifyEmailMutation(\n  $input: VerifyEmailInput!\n) {\n  verifyEmail(input: $input) {\n    errors {\n      __typename\n      ... on InvalidTokenError {\n        __typename\n        message\n      }\n      ... on EmailAlreadyVerifiedError {\n        __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "bc8d74c709d795c6bfe7d61fece490bb";

export default node;
