/**
 * @generated SignedSource<<7e0725ff68577d2cd6a47077a15bd9ba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type VerifyPasswordInput = {
  currentPassword: string;
};
export type VerifyPasswordModalMutation$variables = {
  input: VerifyPasswordInput;
};
export type VerifyPasswordModalMutationVariables = VerifyPasswordModalMutation$variables;
export type VerifyPasswordModalMutation$data = {
  readonly verifyPassword: {
    readonly errors: ReadonlyArray<{
      readonly message?: string;
    }> | null;
  };
};
export type VerifyPasswordModalMutationResponse = VerifyPasswordModalMutation$data;
export type VerifyPasswordModalMutation = {
  variables: VerifyPasswordModalMutationVariables;
  response: VerifyPasswordModalMutation$data;
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
  "type": "IncorrectCurrentPasswordError",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "VerifyPasswordModalMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "VerifyPasswordPayload",
        "kind": "LinkedField",
        "name": "verifyPassword",
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
    "name": "VerifyPasswordModalMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "VerifyPasswordPayload",
        "kind": "LinkedField",
        "name": "verifyPassword",
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
    "cacheID": "aeeea3bca975cecb038bf783aed28174",
    "id": null,
    "metadata": {},
    "name": "VerifyPasswordModalMutation",
    "operationKind": "mutation",
    "text": "mutation VerifyPasswordModalMutation(\n  $input: VerifyPasswordInput!\n) {\n  verifyPassword(input: $input) {\n    errors {\n      __typename\n      ... on IncorrectCurrentPasswordError {\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "91e35027f28812216fe06463592797b3";

export default node;
