/**
 * @generated SignedSource<<58a35a2b530694763953eca2d031d496>>
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
  readonly twoFactorEnabled: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsTwoFactorAuthChooseTwoFactorProviderModal_user" | "SettingsTwoFactorAuthTwoFactorSuccessfullyEnabledModal_user" | "SettingsTwoFactorAuthProviderCard_user">;
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "twoFactorEnabled",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SettingsTwoFactorAuthChooseTwoFactorProviderModal_user"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SettingsTwoFactorAuthTwoFactorSuccessfullyEnabledModal_user"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SettingsTwoFactorAuthProviderCard_user"
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "e259b4384037dfd15fe001fe58e11daf";

export default node;
