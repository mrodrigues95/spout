/**
 * @generated SignedSource<<4fdf6b08b15882cd8940ac6dc0354f84>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DiscussionMessagesList_user$data = {
  readonly id: string;
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
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "befbf2bf52e9b6f09ca5457d3f18ee32";

export default node;
