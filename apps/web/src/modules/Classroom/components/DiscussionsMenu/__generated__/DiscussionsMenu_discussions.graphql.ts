/**
 * @generated SignedSource<<a833204532caf4ca1ac7e17a067e5a6c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DiscussionsMenu_discussions$data = {
  readonly id: string;
  readonly discussions: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
  }>;
  readonly " $fragmentType": "DiscussionsMenu_discussions";
};
export type DiscussionsMenu_discussions = DiscussionsMenu_discussions$data;
export type DiscussionsMenu_discussions$key = {
  readonly " $data"?: DiscussionsMenu_discussions$data;
  readonly " $fragmentSpreads": FragmentRefs<"DiscussionsMenu_discussions">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DiscussionsMenu_discussions",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Discussion",
      "kind": "LinkedField",
      "name": "discussions",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Classroom",
  "abstractKey": null
};
})();

(node as any).hash = "8f8ff1330890a5c30e2e1155ee0ff5d4";

export default node;
