/**
 * @generated SignedSource<<3076ae665828a4e477501d8824516db8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DeleteClassroom_user$data = {
  readonly id: string;
  readonly " $fragmentType": "DeleteClassroom_user";
};
export type DeleteClassroom_user = DeleteClassroom_user$data;
export type DeleteClassroom_user$key = {
  readonly " $data"?: DeleteClassroom_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"DeleteClassroom_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DeleteClassroom_user",
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

(node as any).hash = "b7db75d6c0da79d3ff80070cf644990b";

export default node;
