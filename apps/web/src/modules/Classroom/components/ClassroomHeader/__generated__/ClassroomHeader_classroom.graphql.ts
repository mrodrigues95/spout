/**
 * @generated SignedSource<<8bf5670a0184f870634d9ab7b7669fa7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClassroomHeader_classroom$data = {
  readonly name: string;
  readonly " $fragmentType": "ClassroomHeader_classroom";
};
export type ClassroomHeader_classroom = ClassroomHeader_classroom$data;
export type ClassroomHeader_classroom$key = {
  readonly " $data"?: ClassroomHeader_classroom$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClassroomHeader_classroom">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClassroomHeader_classroom",
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

(node as any).hash = "267e375a9f77bef04548b2644bf546fb";

export default node;
