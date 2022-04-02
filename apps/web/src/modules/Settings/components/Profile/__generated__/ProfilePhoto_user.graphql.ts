/**
 * @generated SignedSource<<6f785fa0954b5842b83820b8abda2762>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type UserProfileColor = "SKY" | "PINK" | "GREEN" | "PURPLE" | "ROSE" | "GRAY" | "ORANGE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ProfilePhoto_user$data = {
  readonly name: string;
  readonly avatarUrl: string | null;
  readonly profileColor: UserProfileColor;
  readonly " $fragmentType": "ProfilePhoto_user";
};
export type ProfilePhoto_user = ProfilePhoto_user$data;
export type ProfilePhoto_user$key = {
  readonly " $data"?: ProfilePhoto_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfilePhoto_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProfilePhoto_user",
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

(node as any).hash = "1e0679a64f7e765a10e80449ea8399b2";

export default node;
