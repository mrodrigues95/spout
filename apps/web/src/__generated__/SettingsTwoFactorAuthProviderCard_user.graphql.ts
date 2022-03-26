/**
 * @generated SignedSource<<4ebd657583050663bbe0596f697de5a8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type UserPreferredProvider = "EMAIL" | "PHONE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SettingsTwoFactorAuthProviderCard_user$data = {
  readonly preferredProvider: UserPreferredProvider | null;
  readonly twoFactorEnabled: boolean;
  readonly twoFactorEnabledAt: string | null;
  readonly " $fragmentType": "SettingsTwoFactorAuthProviderCard_user";
};
export type SettingsTwoFactorAuthProviderCard_user = SettingsTwoFactorAuthProviderCard_user$data;
export type SettingsTwoFactorAuthProviderCard_user$key = {
  readonly " $data"?: SettingsTwoFactorAuthProviderCard_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsTwoFactorAuthProviderCard_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsTwoFactorAuthProviderCard_user",
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

(node as any).hash = "f818df369ce83fd804d0f83f89b71f2a";

export default node;
