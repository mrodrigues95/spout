/**
 * @generated SignedSource<<cc875a2dffbef424e24d4f7268d50373>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DiscussionsNavigation_discussions$data = {
  readonly id: string;
  readonly discussions: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
  }>;
  readonly " $fragmentType": "DiscussionsNavigation_discussions";
};
export type DiscussionsNavigation_discussions = DiscussionsNavigation_discussions$data;
export type DiscussionsNavigation_discussions$key = {
  readonly " $data"?: DiscussionsNavigation_discussions$data;
  readonly " $fragmentSpreads": FragmentRefs<"DiscussionsNavigation_discussions">;
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
  "name": "DiscussionsNavigation_discussions",
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

(node as any).hash = "3777e360adacda2060807e6650f31548";

export default node;
