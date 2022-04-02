/**
 * @generated SignedSource<<8d00dcaf3057f3ed68f410a046012b5d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UserPreferredProvider = "EMAIL" | "PHONE" | "%future added value";
export type DisableTwoFactorInput = {
  sessionId: string;
  currentPassword: string;
};
export type TwoFactorAuthProviderCardMutation$variables = {
  input: DisableTwoFactorInput;
};
export type TwoFactorAuthProviderCardMutationVariables = TwoFactorAuthProviderCardMutation$variables;
export type TwoFactorAuthProviderCardMutation$data = {
  readonly disableTwoFactor: {
    readonly authPayload: {
      readonly user: {
        readonly preferredProvider: UserPreferredProvider | null;
        readonly twoFactorEnabled: boolean;
        readonly twoFactorEnabledAt: string | null;
      } | null;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly __typename?: string;
      readonly message?: string;
    }> | null;
  };
};
export type TwoFactorAuthProviderCardMutationResponse = TwoFactorAuthProviderCardMutation$data;
export type TwoFactorAuthProviderCardMutation = {
  variables: TwoFactorAuthProviderCardMutationVariables;
  response: TwoFactorAuthProviderCardMutation$data;
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
  "name": "preferredProvider",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "twoFactorEnabled",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "twoFactorEnabledAt",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TwoFactorAuthProviderCardMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DisableTwoFactorPayload",
        "kind": "LinkedField",
        "name": "disableTwoFactor",
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
                  (v4/*: any*/)
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
                  (v5/*: any*/),
                  (v6/*: any*/)
                ],
                "type": "Error",
                "abstractKey": "__isError"
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
    "name": "TwoFactorAuthProviderCardMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DisableTwoFactorPayload",
        "kind": "LinkedField",
        "name": "disableTwoFactor",
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
              (v5/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v6/*: any*/)
                ],
                "type": "Error",
                "abstractKey": "__isError"
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
    "cacheID": "8cee8b11557c24ee8855c4cffb398907",
    "id": null,
    "metadata": {},
    "name": "TwoFactorAuthProviderCardMutation",
    "operationKind": "mutation",
    "text": "mutation TwoFactorAuthProviderCardMutation(\n  $input: DisableTwoFactorInput!\n) {\n  disableTwoFactor(input: $input) {\n    authPayload {\n      user {\n        preferredProvider\n        twoFactorEnabled\n        twoFactorEnabledAt\n        id\n      }\n    }\n    errors {\n      __typename\n      ... on Error {\n        __isError: __typename\n        __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ab8d1a4be0592bf25e7582002873799d";

export default node;
