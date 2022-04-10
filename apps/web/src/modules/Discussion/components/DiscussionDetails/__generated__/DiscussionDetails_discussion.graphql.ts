/**
 * @generated SignedSource<<6fa1ebbe9d942297dfe1ee8ad1112a64>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DiscussionDetails_discussion$data = {
  readonly name: string;
  readonly classroom: {
    readonly name: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"Topic_discussion" | "Description_discussion">;
  readonly " $fragmentType": "DiscussionDetails_discussion";
};
export type DiscussionDetails_discussion = DiscussionDetails_discussion$data;
export type DiscussionDetails_discussion$key = {
  readonly " $data"?: DiscussionDetails_discussion$data;
  readonly " $fragmentSpreads": FragmentRefs<"DiscussionDetails_discussion">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DiscussionDetails_discussion",
  "selections": [
    (v0/*: any*/),
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Topic_discussion"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Description_discussion"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Classroom",
      "kind": "LinkedField",
      "name": "classroom",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "Discussion",
  "abstractKey": null
};
})();

(node as any).hash = "49ae8dfcf0542e7ebb9fcc7032756728";

export default node;
