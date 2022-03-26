/**
 * @generated SignedSource<<e32f2f1b1c6848dad06baffe92330cbd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type UserPreferredProvider = "EMAIL" | "PHONE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SettingsTwoFactorProviderCard_user$data = {
  readonly preferredProvider: UserPreferredProvider | null;
  readonly twoFactorEnabled: boolean;
  readonly twoFactorEnabledAt: string | null;
  readonly " $fragmentType": "SettingsTwoFactorProviderCard_user";
};
export type SettingsTwoFactorProviderCard_user = SettingsTwoFactorProviderCard_user$data;
export type SettingsTwoFactorProviderCard_user$key = {
  readonly " $data"?: SettingsTwoFactorProviderCard_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsTwoFactorProviderCard_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsTwoFactorProviderCard_user",
  "selections": [
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
      "name": "twoFactorEnabled",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "twoFactorEnabledAt",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "151e8b35f8d4966536c452200143e9ea";

export default node;
