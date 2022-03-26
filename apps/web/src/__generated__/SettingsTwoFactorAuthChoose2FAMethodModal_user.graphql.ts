/**
 * @generated SignedSource<<7ab93bdc9004ad5008e4a384e9005443>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsTwoFactorAuthChoose2FAMethodModal_user$data = {
  readonly emailConfirmed: boolean;
  readonly phoneNumberConfirmed: boolean;
  readonly " $fragmentType": "SettingsTwoFactorAuthChoose2FAMethodModal_user";
};
export type SettingsTwoFactorAuthChoose2FAMethodModal_user = SettingsTwoFactorAuthChoose2FAMethodModal_user$data;
export type SettingsTwoFactorAuthChoose2FAMethodModal_user$key = {
  readonly " $data"?: SettingsTwoFactorAuthChoose2FAMethodModal_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsTwoFactorAuthChoose2FAMethodModal_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsTwoFactorAuthChoose2FAMethodModal_user",
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

(node as any).hash = "99d9a69e117f625ab4dc55cf53359514";

export default node;
