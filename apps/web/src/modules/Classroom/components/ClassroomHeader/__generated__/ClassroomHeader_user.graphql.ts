/**
 * @generated SignedSource<<c047a3dc1e893eb706fe4fbfcdea409c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClassroomHeader_user$data = {
  readonly isClassroomTeacher: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"MenuActions_user">;
  readonly " $fragmentType": "ClassroomHeader_user";
};
export type ClassroomHeader_user = ClassroomHeader_user$data;
export type ClassroomHeader_user$key = {
  readonly " $data"?: ClassroomHeader_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClassroomHeader_user">;
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
  "name": "ClassroomHeader_user",
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MenuActions_user"
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "0a202c6d1f0f348f6bc639ca8d3ac788";

export default node;
