/**
 * @generated SignedSource<<d0dff13d541389b76bd688ec3bff3ae0>>
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
export type SettingsTwoFactorAuthVerifyPasswordMutation$variables = {
  input: VerifyPasswordInput;
};
export type SettingsTwoFactorAuthVerifyPasswordMutationVariables = SettingsTwoFactorAuthVerifyPasswordMutation$variables;
export type SettingsTwoFactorAuthVerifyPasswordMutation$data = {
  readonly verifyPassword: {
    readonly errors: ReadonlyArray<{
      readonly message?: string;
    }> | null;
  };
};
export type SettingsTwoFactorAuthVerifyPasswordMutationResponse = SettingsTwoFactorAuthVerifyPasswordMutation$data;
export type SettingsTwoFactorAuthVerifyPasswordMutation = {
  variables: SettingsTwoFactorAuthVerifyPasswordMutationVariables;
  response: SettingsTwoFactorAuthVerifyPasswordMutation$data;
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
    "name": "SettingsTwoFactorAuthVerifyPasswordMutation",
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
    "name": "SettingsTwoFactorAuthVerifyPasswordMutation",
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
    "cacheID": "da0c4cd1543fa5abc1163fba6179b016",
    "id": null,
    "metadata": {},
    "name": "SettingsTwoFactorAuthVerifyPasswordMutation",
    "operationKind": "mutation",
    "text": "mutation SettingsTwoFactorAuthVerifyPasswordMutation(\n  $input: VerifyPasswordInput!\n) {\n  verifyPassword(input: $input) {\n    errors {\n      __typename\n      ... on IncorrectCurrentPasswordError {\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0b117915249a47a29f1dde8dadea2da8";

export default node;
