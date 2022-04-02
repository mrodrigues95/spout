/**
 * @generated SignedSource<<4d8343032aa688115ef121f9fdba07fc>>
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
export type RemovePhoneNumberMutation$variables = {
  input: RemovePhoneNumberInput;
};
export type RemovePhoneNumberMutationVariables = RemovePhoneNumberMutation$variables;
export type RemovePhoneNumberMutation$data = {
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
export type RemovePhoneNumberMutationResponse = RemovePhoneNumberMutation$data;
export type RemovePhoneNumberMutation = {
  variables: RemovePhoneNumberMutationVariables;
  response: RemovePhoneNumberMutation$data;
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
    "name": "RemovePhoneNumberMutation",
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
    "name": "RemovePhoneNumberMutation",
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
    "cacheID": "28f50f19754c8ceec030acad5d43d3fc",
    "id": null,
    "metadata": {},
    "name": "RemovePhoneNumberMutation",
    "operationKind": "mutation",
    "text": "mutation RemovePhoneNumberMutation(\n  $input: RemovePhoneNumberInput!\n) {\n  removePhoneNumber(input: $input) {\n    authPayload {\n      user {\n        phoneNumber\n        phoneNumberConfirmed\n        preferredProvider\n        twoFactorEnabled\n        twoFactorEnabledAt\n        id\n      }\n    }\n    errors {\n      __typename\n      ... on SessionExpiredError {\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1f0ef59bba12cd221e79fbfd0fa10a54";

export default node;
