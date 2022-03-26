/**
 * @generated SignedSource<<ddc7073a4d8590290b71879618cc70cd>>
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
    readonly " $fragmentSpreads": FragmentRefs<"SettingsChangeEmail_user" | "SettingsTwoFactorAuth_user" | "SettingsChangePhoneNumber_user">;
  } | null;
};
export type SettingsAccountQueryResponse = SettingsAccountQuery$data;
export type SettingsAccountQuery = {
  variables: SettingsAccountQueryVariables;
  response: SettingsAccountQuery$data;
};

const node: ConcreteRequest = {
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
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SettingsChangeEmail_user"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SettingsTwoFactorAuth_user"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SettingsChangePhoneNumber_user"
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
            "name": "emailConfirmed",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "phoneNumberConfirmed",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "twoFactorEnabled",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "phoneNumber",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "preferredProvider",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "twoFactorEnabledAt",
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
    "cacheID": "dca1331feea0a85ced3de389b31c86ba",
    "id": null,
    "metadata": {},
    "name": "SettingsAccountQuery",
    "operationKind": "query",
    "text": "query SettingsAccountQuery {\n  me {\n    ...SettingsChangeEmail_user\n    ...SettingsTwoFactorAuth_user\n    ...SettingsChangePhoneNumber_user\n    id\n  }\n}\n\nfragment SettingsChangeEmail_user on User {\n  email\n  emailConfirmed\n}\n\nfragment SettingsChangePhoneNumber_user on User {\n  phoneNumber\n  phoneNumberConfirmed\n}\n\nfragment SettingsTwoFactorAuthChooseTwoFactorProviderModal_user on User {\n  emailConfirmed\n  phoneNumberConfirmed\n}\n\nfragment SettingsTwoFactorAuthProviderCard_user on User {\n  preferredProvider\n  twoFactorEnabled\n  twoFactorEnabledAt\n}\n\nfragment SettingsTwoFactorAuthTwoFactorSuccessfullyEnabledModal_user on User {\n  email\n  phoneNumber\n  preferredProvider\n}\n\nfragment SettingsTwoFactorAuth_user on User {\n  emailConfirmed\n  phoneNumberConfirmed\n  twoFactorEnabled\n  ...SettingsTwoFactorAuthChooseTwoFactorProviderModal_user\n  ...SettingsTwoFactorAuthTwoFactorSuccessfullyEnabledModal_user\n  ...SettingsTwoFactorAuthProviderCard_user\n}\n"
  }
};

(node as any).hash = "4804da680711cda6e0dff4d1528f95b5";

export default node;
