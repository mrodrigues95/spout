/**
 * @generated SignedSource<<1d1326bb33618d509f1cb00e7d94d779>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UserPreferredProvider = "EMAIL" | "PHONE" | "%future added value";
export type RemovePhoneNumberInput = {
  sessionId: string;
};
export type SettingsRemovePhoneNumberMutation$variables = {
  input: RemovePhoneNumberInput;
};
export type SettingsRemovePhoneNumberMutationVariables = SettingsRemovePhoneNumberMutation$variables;
export type SettingsRemovePhoneNumberMutation$data = {
  readonly removePhoneNumber: {
    readonly authPayload: {
      readonly user: {
        readonly phoneNumber: string | null;
        readonly phoneNumberConfirmed: boolean;
        readonly preferredProvider: UserPreferredProvider | null;
        readonly twoFactorEnabled: boolean;
        readonly twoFactorEnabledAt: string | null;
      } | null;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly message?: string;
    }> | null;
  };
};
export type SettingsRemovePhoneNumberMutationResponse = SettingsRemovePhoneNumberMutation$data;
export type SettingsRemovePhoneNumberMutation = {
  variables: SettingsRemovePhoneNumberMutationVariables;
  response: SettingsRemovePhoneNumberMutation$data;
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
  "name": "phoneNumber",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "phoneNumberConfirmed",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "preferredProvider",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "twoFactorEnabled",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "twoFactorEnabledAt",
  "storageKey": null
},
v7 = {
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
  "type": "SessionExpiredError",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsRemovePhoneNumberMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RemovePhoneNumberPayload",
        "kind": "LinkedField",
        "name": "removePhoneNumber",
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
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/)
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
              (v7/*: any*/)
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
    "name": "SettingsRemovePhoneNumberMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RemovePhoneNumberPayload",
        "kind": "LinkedField",
        "name": "removePhoneNumber",
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
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v7/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d9ba53a5b45a9e3eeaefe7650538f2ab",
    "id": null,
    "metadata": {},
    "name": "SettingsRemovePhoneNumberMutation",
    "operationKind": "mutation",
    "text": "mutation SettingsRemovePhoneNumberMutation(\n  $input: RemovePhoneNumberInput!\n) {\n  removePhoneNumber(input: $input) {\n    authPayload {\n      user {\n        phoneNumber\n        phoneNumberConfirmed\n        preferredProvider\n        twoFactorEnabled\n        twoFactorEnabledAt\n        id\n      }\n    }\n    errors {\n      __typename\n      ... on SessionExpiredError {\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "279e196f3059e1720bb24ef456164aae";

export default node;
