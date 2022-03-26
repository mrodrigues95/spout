/**
 * @generated SignedSource<<b233846d24ce314077635b882c722769>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsTwoFactorAuthChooseTwoFactorProviderModal_user$data = {
  readonly emailConfirmed: boolean;
  readonly phoneNumberConfirmed: boolean;
  readonly " $fragmentType": "SettingsTwoFactorAuthChooseTwoFactorProviderModal_user";
};
export type SettingsTwoFactorAuthChooseTwoFactorProviderModal_user = SettingsTwoFactorAuthChooseTwoFactorProviderModal_user$data;
export type SettingsTwoFactorAuthChooseTwoFactorProviderModal_user$key = {
  readonly " $data"?: SettingsTwoFactorAuthChooseTwoFactorProviderModal_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsTwoFactorAuthChooseTwoFactorProviderModal_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsTwoFactorAuthChooseTwoFactorProviderModal_user",
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

(node as any).hash = "3e184aacea2e25e70c5429c5ef5dc6f8";

export default node;
