/**
 * @generated SignedSource<<7b2c4756f535cee877c5bbeed3c45c62>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Topic_user$data = {
  readonly isClassroomTeacher: boolean;
  readonly " $fragmentType": "Topic_user";
};
export type Topic_user = Topic_user$data;
export type Topic_user$key = {
  readonly " $data"?: Topic_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"Topic_user">;
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
  "name": "Topic_user",
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

(node as any).hash = "04b9abe6064a7be6a0a0bf2890fb7955";

export default node;
