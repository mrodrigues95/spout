/**
 * @generated SignedSource<<601b0c65e3adc3abe96f59aebe79d722>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MenuActions_classroom$data = {
  readonly " $fragmentSpreads": FragmentRefs<"DeleteClassroom_classroom">;
  readonly " $fragmentType": "MenuActions_classroom";
};
export type MenuActions_classroom = MenuActions_classroom$data;
export type MenuActions_classroom$key = {
  readonly " $data"?: MenuActions_classroom$data;
  readonly " $fragmentSpreads": FragmentRefs<"MenuActions_classroom">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MenuActions_classroom",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DeleteClassroom_classroom"
    }
  ],
  "type": "Classroom",
  "abstractKey": null
};

(node as any).hash = "11ff2f42dc8af3b4f91381d4b1fcf1ed";

export default node;
