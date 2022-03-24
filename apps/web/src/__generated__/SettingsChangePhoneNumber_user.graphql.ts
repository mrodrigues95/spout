/**
 * @generated SignedSource<<08fd2cde431a19fd684f53ddafbf7ff0>>
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
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "21b48abcec559dcdaf9eae59275f65af";

export default node;
