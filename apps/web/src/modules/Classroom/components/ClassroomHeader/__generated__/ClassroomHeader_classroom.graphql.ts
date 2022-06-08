/**
 * @generated SignedSource<<5537f29149b6d7d5a9fc1d3c9a742e99>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClassroomHeader_classroom$data = {
  readonly name: string;
  readonly " $fragmentSpreads": FragmentRefs<"MenuActions_classroom">;
  readonly " $fragmentType": "ClassroomHeader_classroom";
};
export type ClassroomHeader_classroom = ClassroomHeader_classroom$data;
export type ClassroomHeader_classroom$key = {
  readonly " $data"?: ClassroomHeader_classroom$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClassroomHeader_classroom">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClassroomHeader_classroom",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MenuActions_classroom"
    }
  ],
  "type": "Classroom",
  "abstractKey": null
};

(node as any).hash = "093adad425223f8058bf89e5fb4a2621";

export default node;
