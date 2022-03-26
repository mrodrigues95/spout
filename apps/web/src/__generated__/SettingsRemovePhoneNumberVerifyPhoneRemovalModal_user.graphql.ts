/**
 * @generated SignedSource<<fb598481d7e352f8f0f951d5153a768a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type UserPreferredProvider = "EMAIL" | "PHONE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SettingsRemovePhoneNumberVerifyPhoneRemovalModal_user$data = {
  readonly preferredProvider: UserPreferredProvider | null;
  readonly twoFactorEnabled: boolean;
  readonly phoneNumber: string | null;
  readonly " $fragmentType": "SettingsRemovePhoneNumberVerifyPhoneRemovalModal_user";
};
export type SettingsRemovePhoneNumberVerifyPhoneRemovalModal_user = SettingsRemovePhoneNumberVerifyPhoneRemovalModal_user$data;
export type SettingsRemovePhoneNumberVerifyPhoneRemovalModal_user$key = {
  readonly " $data"?: SettingsRemovePhoneNumberVerifyPhoneRemovalModal_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsRemovePhoneNumberVerifyPhoneRemovalModal_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsRemovePhoneNumberVerifyPhoneRemovalModal_user",
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
      "name": "phoneNumber",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "08d8b05be7d00f8e8c1c58af04715184";

export default node;
