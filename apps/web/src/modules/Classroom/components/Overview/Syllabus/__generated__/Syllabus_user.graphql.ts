/**
 * @generated SignedSource<<cb24d5bb403f931b590c0c9906147b82>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Syllabus_user$data = {
  readonly isClassroomTeacher: boolean;
  readonly " $fragmentType": "Syllabus_user";
};
export type Syllabus_user = Syllabus_user$data;
export type Syllabus_user$key = {
  readonly " $data"?: Syllabus_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"Syllabus_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "classroomId"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "Syllabus_user",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "classroomId",
          "variableName": "classroomId"
        }
      ],
      "kind": "ScalarField",
      "name": "isClassroomTeacher",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "f1a877d7c0d48709624588a41ae38a12";

export default node;
