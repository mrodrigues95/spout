/**
 * @generated SignedSource<<a5181301263c22aae3d2ba512afba57a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MenuActions_user$data = {
  readonly " $fragmentSpreads": FragmentRefs<"DeleteClassroom_user">;
  readonly " $fragmentType": "MenuActions_user";
};
export type MenuActions_user = MenuActions_user$data;
export type MenuActions_user$key = {
  readonly " $data"?: MenuActions_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"MenuActions_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MenuActions_user",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DeleteClassroom_user"
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "693d12c6f31ded7a7a04697c6d569019";

export default node;
