/**
 * @generated SignedSource<<f3f43961e9039d39d397204661a8413c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsTwoFactorAuth_user$data = {
  readonly emailConfirmed: boolean;
  readonly " $fragmentType": "SettingsTwoFactorAuth_user";
};
export type SettingsTwoFactorAuth_user = SettingsTwoFactorAuth_user$data;
export type SettingsTwoFactorAuth_user$key = {
  readonly " $data"?: SettingsTwoFactorAuth_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsTwoFactorAuth_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsTwoFactorAuth_user",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "emailConfirmed",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "94c6f56fd6bafe24208541160ad66681";

export default node;
