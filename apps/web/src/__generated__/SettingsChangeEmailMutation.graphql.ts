/**
 * @generated SignedSource<<c858fa9a4c5f2f12c706d06ab1bd6c6a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type GenerateChangeEmailTokenInput = {
  newEmail: string;
  password: string;
};
export type SettingsChangeEmailMutation$variables = {
  input: GenerateChangeEmailTokenInput;
};
export type SettingsChangeEmailMutationVariables = SettingsChangeEmailMutation$variables;
export type SettingsChangeEmailMutation$data = {
  readonly generateChangeEmailToken: {
    readonly authPayload: {
      readonly isLoggedIn: boolean;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly __typename: "IncorrectCurrentPasswordError";
      readonly message: string;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    }> | null;
  };
};
export type SettingsChangeEmailMutationResponse = SettingsChangeEmailMutation$data;
export type SettingsChangeEmailMutation = {
  variables: SettingsChangeEmailMutationVariables;
  response: SettingsChangeEmailMutation$data;
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
  "concreteType": "AuthPayload",
  "kind": "LinkedField",
  "name": "authPayload",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isLoggedIn",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
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
    "name": "SettingsChangeEmailMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GenerateChangeEmailTokenPayload",
        "kind": "LinkedField",
        "name": "generateChangeEmailToken",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
                  (v3/*: any*/),
                  (v4/*: any*/)
                ],
                "type": "IncorrectCurrentPasswordError",
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
    "name": "SettingsChangeEmailMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GenerateChangeEmailTokenPayload",
        "kind": "LinkedField",
        "name": "generateChangeEmailToken",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v4/*: any*/)
                ],
                "type": "IncorrectCurrentPasswordError",
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
    "cacheID": "8bca1325be4019e4719cf5cce0311583",
    "id": null,
    "metadata": {},
    "name": "SettingsChangeEmailMutation",
    "operationKind": "mutation",
    "text": "mutation SettingsChangeEmailMutation(\n  $input: GenerateChangeEmailTokenInput!\n) {\n  generateChangeEmailToken(input: $input) {\n    authPayload {\n      isLoggedIn\n    }\n    errors {\n      __typename\n      ... on IncorrectCurrentPasswordError {\n        __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f240ac7b8d5c3ac1608cbd95f67c0600";

export default node;
