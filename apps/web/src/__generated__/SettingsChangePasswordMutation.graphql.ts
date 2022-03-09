/**
 * @generated SignedSource<<281e3b696fe996d1f61eb62ad12374f0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ChangePasswordInput = {
  sessionId: string;
  currentPassword: string;
  newPassword: string;
};
export type SettingsChangePasswordMutation$variables = {
  input: ChangePasswordInput;
};
export type SettingsChangePasswordMutationVariables = SettingsChangePasswordMutation$variables;
export type SettingsChangePasswordMutation$data = {
  readonly changePassword: {
    readonly errors: ReadonlyArray<{
      readonly __typename: "IncorrectCurrentPasswordError";
      readonly message: string;
    } | {
      readonly __typename: "SessionNotFoundError";
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
export type SettingsChangePasswordMutationResponse = SettingsChangePasswordMutation$data;
export type SettingsChangePasswordMutation = {
  variables: SettingsChangePasswordMutationVariables;
  response: SettingsChangePasswordMutation$data;
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
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v4 = [
  (v2/*: any*/),
  (v3/*: any*/)
],
v5 = [
  (v3/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsChangePasswordMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ChangePasswordPayload",
        "kind": "LinkedField",
        "name": "changePassword",
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
                "kind": "InlineFragment",
                "selections": (v4/*: any*/),
                "type": "IncorrectCurrentPasswordError",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v4/*: any*/),
                "type": "SessionNotFoundError",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v4/*: any*/),
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
    "name": "SettingsChangePasswordMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ChangePasswordPayload",
        "kind": "LinkedField",
        "name": "changePassword",
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
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v5/*: any*/),
                "type": "IncorrectCurrentPasswordError",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v5/*: any*/),
                "type": "SessionNotFoundError",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v5/*: any*/),
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
    "cacheID": "d76bf11404210cdd5b270dee6c71ff84",
    "id": null,
    "metadata": {},
    "name": "SettingsChangePasswordMutation",
    "operationKind": "mutation",
    "text": "mutation SettingsChangePasswordMutation(\n  $input: ChangePasswordInput!\n) {\n  changePassword(input: $input) {\n    errors {\n      __typename\n      ... on IncorrectCurrentPasswordError {\n        __typename\n        message\n      }\n      ... on SessionNotFoundError {\n        __typename\n        message\n      }\n      ... on SessionExpiredError {\n        __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "17d0db86cc83d4937000853352ff68c0";

export default node;
