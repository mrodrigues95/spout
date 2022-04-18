/**
 * @generated SignedSource<<5b717a54d2b906fa0de4c8430f68a2e0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type UserProfileColor = "SKY" | "PINK" | "GREEN" | "PURPLE" | "ROSE" | "GRAY" | "ORANGE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ClassroomParticipants_user$data = {
  readonly id: string;
  readonly avatarUrl: string | null;
  readonly name: string;
  readonly profileColor: UserProfileColor;
  readonly " $fragmentType": "ClassroomParticipants_user";
};
export type ClassroomParticipants_user = ClassroomParticipants_user$data;
export type ClassroomParticipants_user$key = {
  readonly " $data"?: ClassroomParticipants_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClassroomParticipants_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClassroomParticipants_user",
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
      "name": "avatarUrl",
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
      "name": "profileColor",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "a00108935926ab0cf54289680b12d5c1";

export default node;
