/**
 * @generated SignedSource<<3fae3b18963a90ce8dd4184819874a29>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DiscussionDetails_user$data = {
  readonly " $fragmentSpreads": FragmentRefs<"Description_user" | "Topic_user">;
  readonly " $fragmentType": "DiscussionDetails_user";
};
export type DiscussionDetails_user = DiscussionDetails_user$data;
export type DiscussionDetails_user$key = {
  readonly " $data"?: DiscussionDetails_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"DiscussionDetails_user">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Variable",
    "name": "classroomId",
    "variableName": "classroomId"
  }
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "classroomId"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "DiscussionDetails_user",
  "selections": [
    {
      "args": (v0/*: any*/),
      "kind": "FragmentSpread",
      "name": "Description_user"
    },
    {
      "args": (v0/*: any*/),
      "kind": "FragmentSpread",
      "name": "Topic_user"
    }
  ],
  "type": "User",
  "abstractKey": null
};
})();

(node as any).hash = "b28355679fa2e22cdd2eb58e8f7c65a1";

export default node;
