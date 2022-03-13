/**
 * @generated SignedSource<<7cc4158790f31f5fd84d393da1069638>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsAccountQuery$variables = {};
export type SettingsAccountQueryVariables = SettingsAccountQuery$variables;
export type SettingsAccountQuery$data = {
  readonly me: {
    readonly emailConfirmed: boolean;
    readonly " $fragmentSpreads": FragmentRefs<"SettingsChangeEmail_user" | "SettingsTwoFactorAuth_user">;
  } | null;
};
export type SettingsAccountQueryResponse = SettingsAccountQuery$data;
export type SettingsAccountQuery = {
  variables: SettingsAccountQueryVariables;
  response: SettingsAccountQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "emailConfirmed",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsAccountQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SettingsChangeEmail_user"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SettingsTwoFactorAuth_user"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SettingsAccountQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
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
    ]
  },
  "params": {
    "cacheID": "cfa4f81eeacb9758c408bb6d0402de20",
    "id": null,
    "metadata": {},
    "name": "SettingsAccountQuery",
    "operationKind": "query",
    "text": "query SettingsAccountQuery {\n  me {\n    emailConfirmed\n    ...SettingsChangeEmail_user\n    ...SettingsTwoFactorAuth_user\n    id\n  }\n}\n\nfragment SettingsChangeEmail_user on User {\n  email\n  emailConfirmed\n}\n\nfragment SettingsTwoFactorAuth_user on User {\n  emailConfirmed\n}\n"
  }
};
})();

(node as any).hash = "e9ce0568094f53e3e8892aae762169a7";

export default node;
