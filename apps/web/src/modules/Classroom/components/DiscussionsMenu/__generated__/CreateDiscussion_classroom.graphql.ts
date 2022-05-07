/**
 * @generated SignedSource<<734f4ed1bc5544d5a3c7cbfcdb2d5a36>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateDiscussion_classroom$data = {
  readonly id: string;
  readonly " $fragmentType": "CreateDiscussion_classroom";
};
export type CreateDiscussion_classroom = CreateDiscussion_classroom$data;
export type CreateDiscussion_classroom$key = {
  readonly " $data"?: CreateDiscussion_classroom$data;
  readonly " $fragmentSpreads": FragmentRefs<"CreateDiscussion_classroom">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CreateDiscussion_classroom",
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

(node as any).hash = "a33582970045f5a4637f4f5f521b4896";

export default node;
