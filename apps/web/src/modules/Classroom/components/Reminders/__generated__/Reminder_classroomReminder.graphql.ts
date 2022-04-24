/**
 * @generated SignedSource<<a7444b33902b229dbb9bf8117e97ad17>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ClassroomReminderImportance = "LOW" | "MEDIUM" | "HIGH" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Reminder_classroomReminder$data = {
  readonly title: string;
  readonly description: string | null;
  readonly importance: ClassroomReminderImportance;
  readonly dueAt: string;
  readonly " $fragmentType": "Reminder_classroomReminder";
};
export type Reminder_classroomReminder = Reminder_classroomReminder$data;
export type Reminder_classroomReminder$key = {
  readonly " $data"?: Reminder_classroomReminder$data;
  readonly " $fragmentSpreads": FragmentRefs<"Reminder_classroomReminder">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Reminder_classroomReminder",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "importance",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "dueAt",
      "storageKey": null
    }
  ],
  "type": "ClassroomReminder",
  "abstractKey": null
};

(node as any).hash = "7c88e0407eed3b41c34f70a7ac4b4292";

export default node;
