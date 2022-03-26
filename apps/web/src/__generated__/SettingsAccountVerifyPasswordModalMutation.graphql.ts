/**
 * @generated SignedSource<<d81368ef0fc4001881231310322939c0>>
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
export type SettingsAccountVerifyPasswordModalMutation$variables = {
  input: VerifyPasswordInput;
};
export type SettingsAccountVerifyPasswordModalMutationVariables = SettingsAccountVerifyPasswordModalMutation$variables;
export type SettingsAccountVerifyPasswordModalMutation$data = {
  readonly verifyPassword: {
    readonly errors: ReadonlyArray<{
      readonly message?: string;
    }> | null;
  };
};
export type SettingsAccountVerifyPasswordModalMutationResponse = SettingsAccountVerifyPasswordModalMutation$data;
export type SettingsAccountVerifyPasswordModalMutation = {
  variables: SettingsAccountVerifyPasswordModalMutationVariables;
  response: SettingsAccountVerifyPasswordModalMutation$data;
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
    "name": "SettingsAccountVerifyPasswordModalMutation",
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
    "name": "SettingsAccountVerifyPasswordModalMutation",
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
    "cacheID": "0408bfe349869a9bcc9fa3866ec16309",
    "id": null,
    "metadata": {},
    "name": "SettingsAccountVerifyPasswordModalMutation",
    "operationKind": "mutation",
    "text": "mutation SettingsAccountVerifyPasswordModalMutation(\n  $input: VerifyPasswordInput!\n) {\n  verifyPassword(input: $input) {\n    errors {\n      __typename\n      ... on IncorrectCurrentPasswordError {\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b06544ba3e4ea2df37278c5a3a91d62e";

export default node;
