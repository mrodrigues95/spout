/**
 * @generated SignedSource<<fe4bf0901c9a79a4476f3422e63aece3>>
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
  readonly phoneNumberConfirmed: boolean;
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "phoneNumberConfirmed",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "cbf0706492a9d3dc503c3ab2892e8377";

export default node;
