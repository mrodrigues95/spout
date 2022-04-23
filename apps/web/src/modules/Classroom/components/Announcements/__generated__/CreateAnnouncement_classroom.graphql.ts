/**
 * @generated SignedSource<<31e050a4429f79973bd1f556558e5b8c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateAnnouncement_classroom$data = {
  readonly id: string;
  readonly " $fragmentType": "CreateAnnouncement_classroom";
};
export type CreateAnnouncement_classroom = CreateAnnouncement_classroom$data;
export type CreateAnnouncement_classroom$key = {
  readonly " $data"?: CreateAnnouncement_classroom$data;
  readonly " $fragmentSpreads": FragmentRefs<"CreateAnnouncement_classroom">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CreateAnnouncement_classroom",
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

(node as any).hash = "1ed260c2026d10fe2dccb2084a29037b";

export default node;
