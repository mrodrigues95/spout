/**
 * @generated SignedSource<<150fe1b4b1827441457fa28bef9fc772>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type UserProfileColor = "SKY" | "PINK" | "GREEN" | "PURPLE" | "ROSE" | "GRAY" | "ORANGE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type DiscussionMessagesList_user$data = {
  readonly id: string;
  readonly name: string;
  readonly avatarUrl: string | null;
  readonly profileColor: UserProfileColor;
  readonly " $fragmentType": "DiscussionMessagesList_user";
};
export type DiscussionMessagesList_user = DiscussionMessagesList_user$data;
export type DiscussionMessagesList_user$key = {
  readonly " $data"?: DiscussionMessagesList_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"DiscussionMessagesList_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DiscussionMessagesList_user",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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

(node as any).hash = "dc73b9a130037fd889f7f73a40b55f5b";

export default node;
