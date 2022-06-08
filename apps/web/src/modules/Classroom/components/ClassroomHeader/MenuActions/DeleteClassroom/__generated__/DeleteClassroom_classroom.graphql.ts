/**
 * @generated SignedSource<<835c57d4c3b60e6510f265d6a52a545f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DeleteClassroom_classroom$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "DeleteClassroom_classroom";
};
export type DeleteClassroom_classroom = DeleteClassroom_classroom$data;
export type DeleteClassroom_classroom$key = {
  readonly " $data"?: DeleteClassroom_classroom$data;
  readonly " $fragmentSpreads": FragmentRefs<"DeleteClassroom_classroom">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DeleteClassroom_classroom",
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
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Classroom",
  "abstractKey": null
};

(node as any).hash = "24c1f642312e105435dc6b95e78d3b1d";

export default node;
