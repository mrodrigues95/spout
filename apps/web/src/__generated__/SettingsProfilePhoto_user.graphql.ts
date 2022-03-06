/**
 * @generated SignedSource<<95f72853b82b7dd313155fca18de6e89>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type UserProfileColor = "SKY" | "PINK" | "GREEN" | "PURPLE" | "ROSE" | "GRAY" | "ORANGE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SettingsProfilePhoto_user$data = {
  readonly name: string;
  readonly avatarUrl: string | null;
  readonly profileColor: UserProfileColor;
  readonly " $fragmentType": "SettingsProfilePhoto_user";
};
export type SettingsProfilePhoto_user = SettingsProfilePhoto_user$data;
export type SettingsProfilePhoto_user$key = {
  readonly " $data"?: SettingsProfilePhoto_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsProfilePhoto_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsProfilePhoto_user",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "avatarUrl",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "profileColor",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "b550844e3318d0ca435da37113dcaca4";

export default node;
