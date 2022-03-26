/**
 * @generated SignedSource<<813386ea3d924cfdffa75b066b409a13>>
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
export type SettingsVerifyPasswordModalMutation$variables = {
  input: VerifyPasswordInput;
};
export type SettingsVerifyPasswordModalMutationVariables = SettingsVerifyPasswordModalMutation$variables;
export type SettingsVerifyPasswordModalMutation$data = {
  readonly verifyPassword: {
    readonly errors: ReadonlyArray<{
      readonly message?: string;
    }> | null;
  };
};
export type SettingsVerifyPasswordModalMutationResponse = SettingsVerifyPasswordModalMutation$data;
export type SettingsVerifyPasswordModalMutation = {
  variables: SettingsVerifyPasswordModalMutationVariables;
  response: SettingsVerifyPasswordModalMutation$data;
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
    "name": "SettingsVerifyPasswordModalMutation",
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
    "name": "SettingsVerifyPasswordModalMutation",
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
    "cacheID": "9b9562ce7ecb8b1fd11a1e34a63695d1",
    "id": null,
    "metadata": {},
    "name": "SettingsVerifyPasswordModalMutation",
    "operationKind": "mutation",
    "text": "mutation SettingsVerifyPasswordModalMutation(\n  $input: VerifyPasswordInput!\n) {\n  verifyPassword(input: $input) {\n    errors {\n      __typename\n      ... on IncorrectCurrentPasswordError {\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "300a10cb6310715b8b341c0554da92f6";

export default node;
