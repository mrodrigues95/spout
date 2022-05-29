/**
 * @generated SignedSource<<837577d739cd299721346056745398d4>>
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
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "cfad88aa9be6cfea58a93c4cd310eba6";

export default node;
