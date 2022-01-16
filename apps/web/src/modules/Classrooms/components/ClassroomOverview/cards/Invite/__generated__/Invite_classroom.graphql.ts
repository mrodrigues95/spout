/**
 * @generated SignedSource<<afbd80204bbf773b25f818e8444b8916>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Invite_classroom$data = {
  readonly name: string;
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Classroom",
  "abstractKey": null
};

(node as any).hash = "ed0627461b67d02e7d9d920c590333f5";

export default node;
