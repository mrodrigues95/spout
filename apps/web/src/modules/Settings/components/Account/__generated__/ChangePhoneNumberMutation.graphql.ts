/**
 * @generated SignedSource<<d72d8a1c9d09e6ebd42ac3a63e07af65>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ChangePhoneNumberInput = {
  sessionId: string;
  token: string;
};
export type ChangePhoneNumberMutation$variables = {
  input: ChangePhoneNumberInput;
};
export type ChangePhoneNumberMutationVariables = ChangePhoneNumberMutation$variables;
export type ChangePhoneNumberMutation$data = {
  readonly changePhoneNumber: {
    readonly authPayload: {
      readonly user: {
        readonly phoneNumber: string | null;
        readonly phoneNumberConfirmed: boolean;
      } | null;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly __typename: "InvalidTokenError";
      readonly message: string;
    } | {
      readonly __typename: "SessionExpiredError";
      readonly message: string;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    }> | null;
  };
};
export type ChangePhoneNumberMutationResponse = ChangePhoneNumberMutation$data;
export type ChangePhoneNumberMutation = {
  variables: ChangePhoneNumberMutationVariables;
  response: ChangePhoneNumberMutation$data;
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
  "name": "__typename",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v6 = [
  (v4/*: any*/),
  (v5/*: any*/)
],
v7 = [
  (v5/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChangePhoneNumberMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ChangePhoneNumberPayload",
        "kind": "LinkedField",
        "name": "changePhoneNumber",
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
                  (v3/*: any*/)
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
                "selections": (v6/*: any*/),
                "type": "InvalidTokenError",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v6/*: any*/),
                "type": "SessionExpiredError",
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
    "name": "ChangePhoneNumberMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ChangePhoneNumberPayload",
        "kind": "LinkedField",
        "name": "changePhoneNumber",
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
              (v4/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v7/*: any*/),
                "type": "InvalidTokenError",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v7/*: any*/),
                "type": "SessionExpiredError",
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
    "cacheID": "7f577096e3e78ae19274637684c37a58",
    "id": null,
    "metadata": {},
    "name": "ChangePhoneNumberMutation",
    "operationKind": "mutation",
    "text": "mutation ChangePhoneNumberMutation(\n  $input: ChangePhoneNumberInput!\n) {\n  changePhoneNumber(input: $input) {\n    authPayload {\n      user {\n        phoneNumber\n        phoneNumberConfirmed\n        id\n      }\n    }\n    errors {\n      __typename\n      ... on InvalidTokenError {\n        __typename\n        message\n      }\n      ... on SessionExpiredError {\n        __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "dfd9801b221d5edf30c9abbd3df49e3d";

export default node;
