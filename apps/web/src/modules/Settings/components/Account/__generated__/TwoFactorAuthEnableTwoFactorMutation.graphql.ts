/**
 * @generated SignedSource<<49b4835b2767f306deaa92e8b4cd45de>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UserPreferredProvider = "EMAIL" | "PHONE" | "%future added value";
export type EnableTwoFactorInput = {
  sessionId: string;
  provider: UserPreferredProvider;
};
export type TwoFactorAuthEnableTwoFactorMutation$variables = {
  input: EnableTwoFactorInput;
};
export type TwoFactorAuthEnableTwoFactorMutationVariables = TwoFactorAuthEnableTwoFactorMutation$variables;
export type TwoFactorAuthEnableTwoFactorMutation$data = {
  readonly enableTwoFactor: {
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
export type TwoFactorAuthEnableTwoFactorMutationResponse = TwoFactorAuthEnableTwoFactorMutation$data;
export type TwoFactorAuthEnableTwoFactorMutation = {
  variables: TwoFactorAuthEnableTwoFactorMutationVariables;
  response: TwoFactorAuthEnableTwoFactorMutation$data;
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
    "name": "TwoFactorAuthEnableTwoFactorMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EnableTwoFactorPayload",
        "kind": "LinkedField",
        "name": "enableTwoFactor",
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
    "name": "TwoFactorAuthEnableTwoFactorMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EnableTwoFactorPayload",
        "kind": "LinkedField",
        "name": "enableTwoFactor",
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
    "cacheID": "6d345e2cc16063c423af1046dad14a0e",
    "id": null,
    "metadata": {},
    "name": "TwoFactorAuthEnableTwoFactorMutation",
    "operationKind": "mutation",
    "text": "mutation TwoFactorAuthEnableTwoFactorMutation(\n  $input: EnableTwoFactorInput!\n) {\n  enableTwoFactor(input: $input) {\n    authPayload {\n      user {\n        preferredProvider\n        twoFactorEnabled\n        twoFactorEnabledAt\n        id\n      }\n    }\n    errors {\n      __typename\n      ... on Error {\n        __isError: __typename\n        __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7c374d41a50adc2e95131a8bac63b094";

export default node;
