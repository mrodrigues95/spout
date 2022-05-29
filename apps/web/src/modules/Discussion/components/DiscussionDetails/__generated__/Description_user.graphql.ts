/**
 * @generated SignedSource<<b846898a49261d99fc36a419fdf12728>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Description_user$data = {
  readonly isClassroomTeacher: boolean;
  readonly " $fragmentType": "Description_user";
};
export type Description_user = Description_user$data;
export type Description_user$key = {
  readonly " $data"?: Description_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"Description_user">;
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
  "name": "Description_user",
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

(node as any).hash = "0a317083a569264be0a2618cb6486ac1";

export default node;
