/**
 * @generated SignedSource<<5846cc3b12bc1294e520835f9b41629d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RemindersList_user$data = {
  readonly " $fragmentSpreads": FragmentRefs<"Reminder_user">;
  readonly " $fragmentType": "RemindersList_user";
};
export type RemindersList_user = RemindersList_user$data;
export type RemindersList_user$key = {
  readonly " $data"?: RemindersList_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"RemindersList_user">;
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
  "name": "RemindersList_user",
  "selections": [
    {
      "args": [
        {
          "kind": "Variable",
          "name": "classroomId",
          "variableName": "classroomId"
        }
      ],
      "kind": "FragmentSpread",
      "name": "Reminder_user"
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "a627da7fdb8296007d1f9b5e0cab6de0";

export default node;
