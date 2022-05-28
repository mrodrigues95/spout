/**
 * @generated SignedSource<<93f7b6eaccc2e7cbf330e1ca43c8d3d0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SyllabusUploadAttachments_classroom$data = {
  readonly id: string;
  readonly syllabus: {
    readonly content: string;
  } | null;
  readonly " $fragmentType": "SyllabusUploadAttachments_classroom";
};
export type SyllabusUploadAttachments_classroom = SyllabusUploadAttachments_classroom$data;
export type SyllabusUploadAttachments_classroom$key = {
  readonly " $data"?: SyllabusUploadAttachments_classroom$data;
  readonly " $fragmentSpreads": FragmentRefs<"SyllabusUploadAttachments_classroom">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SyllabusUploadAttachments_classroom",
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

(node as any).hash = "1976fe2115b87067ad816ae08e23e1f9";

export default node;
