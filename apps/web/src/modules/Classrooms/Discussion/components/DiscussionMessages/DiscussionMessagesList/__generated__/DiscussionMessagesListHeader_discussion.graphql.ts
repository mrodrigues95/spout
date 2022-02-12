/**
 * @generated SignedSource<<4618054f265653cd97bd8ecf92ec2522>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DiscussionMessagesListHeader_discussion$data = {
  readonly name: string;
  readonly topic: string | null;
  readonly description: string | null;
  readonly " $fragmentType": "DiscussionMessagesListHeader_discussion";
};
export type DiscussionMessagesListHeader_discussion = DiscussionMessagesListHeader_discussion$data;
export type DiscussionMessagesListHeader_discussion$key = {
  readonly " $data"?: DiscussionMessagesListHeader_discussion$data;
  readonly " $fragmentSpreads": FragmentRefs<"DiscussionMessagesListHeader_discussion">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DiscussionMessagesListHeader_discussion",
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
      "name": "topic",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    }
  ],
  "type": "Discussion",
  "abstractKey": null
};

(node as any).hash = "44d5c3d5b1cf50742557b4780df7bec0";

export default node;
