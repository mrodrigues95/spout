/**
 * @generated SignedSource<<6c439b43ce52cf3137836afd93dc6813>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AccountQuery$variables = {};
export type AccountQueryVariables = AccountQuery$variables;
export type AccountQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"ChangeEmail_user" | "TwoFactorAuth_user" | "ChangePhoneNumber_user">;
  } | null;
};
export type AccountQueryResponse = AccountQuery$data;
export type AccountQuery = {
  variables: AccountQueryVariables;
  response: AccountQuery$data;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AccountQuery",
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
            "name": "ChangeEmail_user"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "TwoFactorAuth_user"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ChangePhoneNumber_user"
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
    "name": "AccountQuery",
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
    "cacheID": "e1537ac399325af2475eb81373450930",
    "id": null,
    "metadata": {},
    "name": "AccountQuery",
    "operationKind": "query",
    "text": "query AccountQuery {\n  me {\n    ...ChangeEmail_user\n    ...TwoFactorAuth_user\n    ...ChangePhoneNumber_user\n    id\n  }\n}\n\nfragment ChangeEmail_user on User {\n  email\n  emailConfirmed\n}\n\nfragment ChangePhoneNumber_user on User {\n  phoneNumber\n  phoneNumberConfirmed\n  ...RemovePhoneNumber_user\n}\n\nfragment RemovePhoneNumberVerifyPhoneRemovalModal_user on User {\n  preferredProvider\n  twoFactorEnabled\n  phoneNumber\n}\n\nfragment RemovePhoneNumber_user on User {\n  ...RemovePhoneNumberVerifyPhoneRemovalModal_user\n}\n\nfragment TwoFactorAuthChooseTwoFactorProviderModal_user on User {\n  emailConfirmed\n  phoneNumberConfirmed\n}\n\nfragment TwoFactorAuthProviderCard_user on User {\n  preferredProvider\n  twoFactorEnabled\n  twoFactorEnabledAt\n}\n\nfragment TwoFactorAuthTwoFactorSuccessfullyEnabledModal_user on User {\n  email\n  phoneNumber\n  preferredProvider\n}\n\nfragment TwoFactorAuth_user on User {\n  emailConfirmed\n  phoneNumberConfirmed\n  twoFactorEnabled\n  ...TwoFactorAuthChooseTwoFactorProviderModal_user\n  ...TwoFactorAuthTwoFactorSuccessfullyEnabledModal_user\n  ...TwoFactorAuthProviderCard_user\n}\n"
  }
};

(node as any).hash = "4f1441509e940caf2a3beb769c6a43db";

export default node;
