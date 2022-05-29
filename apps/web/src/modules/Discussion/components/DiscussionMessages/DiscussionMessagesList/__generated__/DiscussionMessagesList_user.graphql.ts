/**
 * @generated SignedSource<<45f5864a1ba3e044f69fb3d2cf1c5086>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type UserProfileColor = "SKY" | "PINK" | "GREEN" | "PURPLE" | "ROSE" | "GRAY" | "ORANGE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type DiscussionMessagesList_user$data = {
  readonly id: string;
  readonly name: string;
  readonly avatarUrl: string | null;
  readonly profileColor: UserProfileColor;
  readonly isClassroomTeacher: boolean;
  readonly " $fragmentType": "DiscussionMessagesList_user";
};
export type DiscussionMessagesList_user = DiscussionMessagesList_user$data;
export type DiscussionMessagesList_user$key = {
  readonly " $data"?: DiscussionMessagesList_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"DiscussionMessagesList_user">;
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
  "name": "DiscussionMessagesList_user",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "avatarUrl",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "profileColor",
      "storageKey": null
    },
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

(node as any).hash = "63ccd41245a6e1d45b6b8366ede96e35";

export default node;
