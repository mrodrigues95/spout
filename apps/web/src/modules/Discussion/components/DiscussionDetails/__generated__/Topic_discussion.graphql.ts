/**
 * @generated SignedSource<<52624d517f2af694250844093b90fe1b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Topic_discussion$data = {
  readonly id: string;
  readonly topic: string | null;
  readonly " $fragmentType": "Topic_discussion";
};
export type Topic_discussion = Topic_discussion$data;
export type Topic_discussion$key = {
  readonly " $data"?: Topic_discussion$data;
  readonly " $fragmentSpreads": FragmentRefs<"Topic_discussion">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Topic_discussion",
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
      "name": "topic",
      "storageKey": null
    }
  ],
  "type": "Discussion",
  "abstractKey": null
};

(node as any).hash = "56a06e34fcf1f8a10945e34add232942";

export default node;
