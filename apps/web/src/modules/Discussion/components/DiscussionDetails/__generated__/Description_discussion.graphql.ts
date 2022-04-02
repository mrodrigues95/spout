/**
 * @generated SignedSource<<61172e6302ef821c1b60f9a1600cb046>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Description_discussion$data = {
  readonly id: string;
  readonly description: string | null;
  readonly " $fragmentType": "Description_discussion";
};
export type Description_discussion = Description_discussion$data;
export type Description_discussion$key = {
  readonly " $data"?: Description_discussion$data;
  readonly " $fragmentSpreads": FragmentRefs<"Description_discussion">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Description_discussion",
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
      "name": "description",
      "storageKey": null
    }
  ],
  "type": "Discussion",
  "abstractKey": null
};

(node as any).hash = "fd383034708c23cd63453eb9050f176b";

export default node;
