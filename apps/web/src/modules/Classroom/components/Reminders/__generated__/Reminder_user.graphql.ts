/**
 * @generated SignedSource<<338c0f31be30ec39471a42e0e652b5b8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Reminder_user$data = {
  readonly isClassroomTeacher: boolean;
  readonly " $fragmentType": "Reminder_user";
};
export type Reminder_user = Reminder_user$data;
export type Reminder_user$key = {
  readonly " $data"?: Reminder_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"Reminder_user">;
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
  "name": "Reminder_user",
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

(node as any).hash = "46ac2ee7a838cc96c4eaba6e1534a942";

export default node;
