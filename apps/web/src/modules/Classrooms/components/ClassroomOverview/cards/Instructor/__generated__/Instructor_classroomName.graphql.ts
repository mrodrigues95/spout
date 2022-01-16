/**
 * @generated SignedSource<<611168e699c094d6441b5dc8df8ef513>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Instructor_classroomName$data = {
  readonly " $fragmentSpreads": FragmentRefs<"Invite_classroom">;
  readonly " $fragmentType": "Instructor_classroomName";
};
export type Instructor_classroomName = Instructor_classroomName$data;
export type Instructor_classroomName$key = {
  readonly " $data"?: Instructor_classroomName$data;
  readonly " $fragmentSpreads": FragmentRefs<"Instructor_classroomName">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Instructor_classroomName",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Invite_classroom"
    }
  ],
  "type": "Classroom",
  "abstractKey": null
};

(node as any).hash = "1b3b2c1a447b347a6779e87dc91fa9e5";

export default node;
