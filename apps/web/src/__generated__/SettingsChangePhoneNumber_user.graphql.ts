/**
 * @generated SignedSource<<3349cc6ae4949510a6c7ce8f2391e9ff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsChangePhoneNumber_user$data = {
  readonly phoneNumber: string | null;
  readonly phoneNumberConfirmed: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsRemovePhoneNumber_user">;
  readonly " $fragmentType": "SettingsChangePhoneNumber_user";
};
export type SettingsChangePhoneNumber_user = SettingsChangePhoneNumber_user$data;
export type SettingsChangePhoneNumber_user$key = {
  readonly " $data"?: SettingsChangePhoneNumber_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsChangePhoneNumber_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsChangePhoneNumber_user",
  "selections": [
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
      "name": "phoneNumberConfirmed",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SettingsRemovePhoneNumber_user"
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "276cc9803b1541de4e150d00e4c80eb5";

export default node;
