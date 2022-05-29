/**
 * @generated SignedSource<<09724b286f9518df6f20e4a8f36b6e0e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Announcement_user$data = {
  readonly isClassroomTeacher: boolean;
  readonly " $fragmentType": "Announcement_user";
};
export type Announcement_user = Announcement_user$data;
export type Announcement_user$key = {
  readonly " $data"?: Announcement_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"Announcement_user">;
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
  "name": "Announcement_user",
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

(node as any).hash = "df9416361a6f47a42c78ef87734f5fde";

export default node;
