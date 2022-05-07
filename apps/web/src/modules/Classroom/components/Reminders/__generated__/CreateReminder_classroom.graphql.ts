/**
 * @generated SignedSource<<41af9075b36942fbf1525ce7cefdd585>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateReminder_classroom$data = {
  readonly id: string;
  readonly " $fragmentType": "CreateReminder_classroom";
};
export type CreateReminder_classroom = CreateReminder_classroom$data;
export type CreateReminder_classroom$key = {
  readonly " $data"?: CreateReminder_classroom$data;
  readonly " $fragmentSpreads": FragmentRefs<"CreateReminder_classroom">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CreateReminder_classroom",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Classroom",
  "abstractKey": null
};

(node as any).hash = "60862b87a19ea8ad3b333ede14cb5467";

export default node;
