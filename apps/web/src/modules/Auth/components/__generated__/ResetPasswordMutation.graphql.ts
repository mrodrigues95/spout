/**
 * @generated SignedSource<<e4c14046eca093be567265751b8f7abe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ResetPasswordInput = {
  token: string;
  newPassword: string;
  confirmNewPassword: string;
};
export type ResetPasswordMutation$variables = {
  input: ResetPasswordInput;
};
export type ResetPasswordMutationVariables = ResetPasswordMutation$variables;
export type ResetPasswordMutation$data = {
  readonly resetPassword: {
    readonly errors: ReadonlyArray<{
      readonly message?: string;
    }> | null;
  };
};
export type ResetPasswordMutationResponse = ResetPasswordMutation$data;
export type ResetPasswordMutation = {
  variables: ResetPasswordMutationVariables;
  response: ResetPasswordMutation$data;
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
  "type": "InvalidTokenError",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ResetPasswordMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ResetPasswordPayload",
        "kind": "LinkedField",
        "name": "resetPassword",
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
              (v2/*: any*/)
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
    "name": "ResetPasswordMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ResetPasswordPayload",
        "kind": "LinkedField",
        "name": "resetPassword",
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
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2d4e2d2b3e231a7313c73831f42379ba",
    "id": null,
    "metadata": {},
    "name": "ResetPasswordMutation",
    "operationKind": "mutation",
    "text": "mutation ResetPasswordMutation(\n  $input: ResetPasswordInput!\n) {\n  resetPassword(input: $input) {\n    errors {\n      __typename\n      ... on InvalidTokenError {\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f5b4d56fa5736ef8fd0694983aea7b2f";

export default node;
