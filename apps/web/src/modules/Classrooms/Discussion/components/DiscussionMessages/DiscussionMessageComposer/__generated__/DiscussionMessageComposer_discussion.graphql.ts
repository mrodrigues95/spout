/**
 * @generated SignedSource<<80bcbe99aa8b5ba2490ef8a94e84ff2a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DiscussionMessageComposer_discussion$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "DiscussionMessageComposer_discussion";
};
export type DiscussionMessageComposer_discussion = DiscussionMessageComposer_discussion$data;
export type DiscussionMessageComposer_discussion$key = {
  readonly " $data"?: DiscussionMessageComposer_discussion$data;
  readonly " $fragmentSpreads": FragmentRefs<"DiscussionMessageComposer_discussion">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DiscussionMessageComposer_discussion",
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
    }
  ],
  "type": "Discussion",
  "abstractKey": null
};

(node as any).hash = "a8538fcf0323afbaacc24b10a2af535f";

export default node;
