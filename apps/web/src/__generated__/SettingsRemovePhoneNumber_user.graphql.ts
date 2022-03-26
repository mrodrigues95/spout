/**
 * @generated SignedSource<<2cd82f0f88579f59ba5dc996be57320e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsRemovePhoneNumber_user$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SettingsRemovePhoneNumberVerifyPhoneRemovalModal_user">;
  readonly " $fragmentType": "SettingsRemovePhoneNumber_user";
};
export type SettingsRemovePhoneNumber_user = SettingsRemovePhoneNumber_user$data;
export type SettingsRemovePhoneNumber_user$key = {
  readonly " $data"?: SettingsRemovePhoneNumber_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsRemovePhoneNumber_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsRemovePhoneNumber_user",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SettingsRemovePhoneNumberVerifyPhoneRemovalModal_user"
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "cae51d6168d3be591b9e2ec449dd731a";

export default node;
