/**
 * @generated SignedSource<<7b367eec3634a562d66e92ac8abe0883>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type UserProfileColor = "SKY" | "PINK" | "GREEN" | "PURPLE" | "ROSE" | "GRAY" | "ORANGE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Syllabus_classroom$data = {
  readonly id: string;
  readonly name: string;
  readonly syllabus: {
    readonly content: string;
    readonly updatedAt: string;
    readonly " $fragmentSpreads": FragmentRefs<"SyllabusAttachments_classroomSyllabus">;
  } | null;
  readonly createdBy: {
    readonly name: string;
    readonly avatarUrl: string | null;
    readonly profileColor: UserProfileColor;
  };
  readonly " $fragmentSpreads": FragmentRefs<"SyllabusUploadAttachments_classroom">;
  readonly " $fragmentType": "Syllabus_classroom";
};
export type Syllabus_classroom = Syllabus_classroom$data;
export type Syllabus_classroom$key = {
  readonly " $data"?: Syllabus_classroom$data;
  readonly " $fragmentSpreads": FragmentRefs<"Syllabus_classroom">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Syllabus_classroom",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    (v0/*: any*/),
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "updatedAt",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SyllabusAttachments_classroomSyllabus"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "createdBy",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "avatarUrl",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "profileColor",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SyllabusUploadAttachments_classroom"
    }
  ],
  "type": "Classroom",
  "abstractKey": null
};
})();

(node as any).hash = "66c1181195f86864a354426b248f7e32";

export default node;
