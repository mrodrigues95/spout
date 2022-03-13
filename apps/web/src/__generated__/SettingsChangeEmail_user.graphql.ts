/**
 * @generated SignedSource<<6beeab2a3f7cfb5fc1c2397968b10f22>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsChangeEmail_user$data = {
  readonly email: string;
  readonly emailConfirmed: boolean;
  readonly " $fragmentType": "SettingsChangeEmail_user";
};
export type SettingsChangeEmail_user = SettingsChangeEmail_user$data;
export type SettingsChangeEmail_user$key = {
  readonly " $data"?: SettingsChangeEmail_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsChangeEmail_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsChangeEmail_user",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "email",
      "storageKey": null
    },
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

(node as any).hash = "c35ed0995c02cf7270c551a5862a5923";

export default node;
