/**
 * @generated SignedSource<<89d494ce34d968bd7070aee7935155a2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Syllabus_classroom$data = {
  readonly name: string;
  readonly " $fragmentType": "Syllabus_classroom";
};
export type Syllabus_classroom = Syllabus_classroom$data;
export type Syllabus_classroom$key = {
  readonly " $data"?: Syllabus_classroom$data;
  readonly " $fragmentSpreads": FragmentRefs<"Syllabus_classroom">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Syllabus_classroom",
  "selections": [
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

(node as any).hash = "e9e4c73252078a71be8e5f5835ac872d";

export default node;
