/**
 * @generated SignedSource<<8a61cd267108b2968d1ec3bb5267165e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type UserPreferredProvider = "EMAIL" | "PHONE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SettingsTwoFactorAuthTwoFactorSuccessfullyEnabledModal_user$data = {
  readonly email: string;
  readonly phoneNumber: string | null;
  readonly preferredProvider: UserPreferredProvider | null;
  readonly " $fragmentType": "SettingsTwoFactorAuthTwoFactorSuccessfullyEnabledModal_user";
};
export type SettingsTwoFactorAuthTwoFactorSuccessfullyEnabledModal_user = SettingsTwoFactorAuthTwoFactorSuccessfullyEnabledModal_user$data;
export type SettingsTwoFactorAuthTwoFactorSuccessfullyEnabledModal_user$key = {
  readonly " $data"?: SettingsTwoFactorAuthTwoFactorSuccessfullyEnabledModal_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsTwoFactorAuthTwoFactorSuccessfullyEnabledModal_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsTwoFactorAuthTwoFactorSuccessfullyEnabledModal_user",
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
      "name": "phoneNumber",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "preferredProvider",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "09210b00fdaafc7f56b233eb97b37bee";

export default node;
