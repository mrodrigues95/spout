/**
 * @generated SignedSource<<ac070e9b898058c7208fd0fb261ea9f3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SyllabusAttachments_classroomSyllabus$data = {
  readonly attachments: ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"SyllabusAttachment_file">;
  }>;
  readonly " $fragmentType": "SyllabusAttachments_classroomSyllabus";
};
export type SyllabusAttachments_classroomSyllabus = SyllabusAttachments_classroomSyllabus$data;
export type SyllabusAttachments_classroomSyllabus$key = {
  readonly " $data"?: SyllabusAttachments_classroomSyllabus$data;
  readonly " $fragmentSpreads": FragmentRefs<"SyllabusAttachments_classroomSyllabus">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SyllabusAttachments_classroomSyllabus",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "File",
      "kind": "LinkedField",
      "name": "attachments",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SyllabusAttachment_file"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ClassroomSyllabus",
  "abstractKey": null
};

(node as any).hash = "9ce319cb1a9c4706acaac2e4b56b5f8a";

export default node;
