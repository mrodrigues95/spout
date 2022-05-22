/**
 * @generated SignedSource<<6356d5685fd121849cc971e9b5651206>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Invite_classroom$data = {
  readonly " $fragmentSpreads": FragmentRefs<"Invite_InviteModal_classroom">;
  readonly " $fragmentType": "Invite_classroom";
};
export type Invite_classroom = Invite_classroom$data;
export type Invite_classroom$key = {
  readonly " $data"?: Invite_classroom$data;
  readonly " $fragmentSpreads": FragmentRefs<"Invite_classroom">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Invite_classroom",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Invite_InviteModal_classroom"
    }
  ],
  "type": "Classroom",
  "abstractKey": null
};

(node as any).hash = "e37525428c775ea0c1d3cc57dcb1bff0";

export default node;
