/**
 * @generated SignedSource<<cbb98ec4bc68e5e7ecface891395f8ae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DiscussionHeader_discussion$data = {
  readonly id: string;
  readonly name: string;
  readonly classroom: {
    readonly id: string;
    readonly discussions: ReadonlyArray<{
      readonly id: string;
      readonly name: string;
    }>;
  };
  readonly " $fragmentType": "DiscussionHeader_discussion";
};
export type DiscussionHeader_discussion = DiscussionHeader_discussion$data;
export type DiscussionHeader_discussion$key = {
  readonly " $data"?: DiscussionHeader_discussion$data;
  readonly " $fragmentSpreads": FragmentRefs<"DiscussionHeader_discussion">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
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
  "name": "DiscussionHeader_discussion",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Classroom",
      "kind": "LinkedField",
      "name": "classroom",
      "plural": false,
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
            (v1/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Discussion",
  "abstractKey": null
};
})();

(node as any).hash = "ad04a609c9132a32144b9d36aa425fe9";

export default node;
