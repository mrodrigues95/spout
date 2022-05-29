/**
 * @generated SignedSource<<45a882a34c554513dae10b147957c141>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DiscussionsMenu_user$data = {
  readonly isClassroomTeacher: boolean;
  readonly " $fragmentType": "DiscussionsMenu_user";
};
export type DiscussionsMenu_user = DiscussionsMenu_user$data;
export type DiscussionsMenu_user$key = {
  readonly " $data"?: DiscussionsMenu_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"DiscussionsMenu_user">;
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
  "name": "DiscussionsMenu_user",
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

(node as any).hash = "8cf69bd4699dda632521f5c4de7bdcad";

export default node;
