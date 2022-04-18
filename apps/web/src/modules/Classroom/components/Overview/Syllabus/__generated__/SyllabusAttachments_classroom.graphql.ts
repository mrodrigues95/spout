/**
 * @generated SignedSource<<d8c74928d6859ef8322a1edce4bc42b5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SyllabusAttachments_classroom$data = {
  readonly syllabus: {
    readonly content: string;
  } | null;
  readonly " $fragmentType": "SyllabusAttachments_classroom";
};
export type SyllabusAttachments_classroom = SyllabusAttachments_classroom$data;
export type SyllabusAttachments_classroom$key = {
  readonly " $data"?: SyllabusAttachments_classroom$data;
  readonly " $fragmentSpreads": FragmentRefs<"SyllabusAttachments_classroom">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SyllabusAttachments_classroom",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ClassroomSyllabus",
      "kind": "LinkedField",
      "name": "syllabus",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "content",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Classroom",
  "abstractKey": null
};

(node as any).hash = "6392ea632a3e05e6ce24846b98fc321f";

export default node;
