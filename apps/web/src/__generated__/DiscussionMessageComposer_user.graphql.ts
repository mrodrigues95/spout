/**
 * @generated SignedSource<<b355a51a07030057ee62739931dcadd3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type UserProfileColor = "SKY" | "PINK" | "GREEN" | "PURPLE" | "ROSE" | "GRAY" | "ORANGE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type DiscussionMessageComposer_user$data = {
  readonly id: string;
  readonly name: string;
  readonly avatarUrl: string | null;
  readonly profileColor: UserProfileColor;
  readonly " $fragmentType": "DiscussionMessageComposer_user";
};
export type DiscussionMessageComposer_user = DiscussionMessageComposer_user$data;
export type DiscussionMessageComposer_user$key = {
  readonly " $data"?: DiscussionMessageComposer_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"DiscussionMessageComposer_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DiscussionMessageComposer_user",
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

(node as any).hash = "f820d20b82faa1e3ea9facc9469b4fd2";

export default node;
