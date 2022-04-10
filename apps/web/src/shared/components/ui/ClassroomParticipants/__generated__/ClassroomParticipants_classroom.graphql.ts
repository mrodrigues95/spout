/**
 * @generated SignedSource<<710728f343b1e7c3c9db7011445465ff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type UserProfileColor = "SKY" | "PINK" | "GREEN" | "PURPLE" | "ROSE" | "GRAY" | "ORANGE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ClassroomParticipants_classroom$data = {
  readonly users: ReadonlyArray<{
    readonly id: string;
    readonly avatarUrl: string | null;
    readonly name: string;
    readonly profileColor: UserProfileColor;
  }>;
  readonly " $fragmentType": "ClassroomParticipants_classroom";
};
export type ClassroomParticipants_classroom = ClassroomParticipants_classroom$data;
export type ClassroomParticipants_classroom$key = {
  readonly " $data"?: ClassroomParticipants_classroom$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClassroomParticipants_classroom">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClassroomParticipants_classroom",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "users",
      "plural": true,
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
      "storageKey": null
    }
  ],
  "type": "Classroom",
  "abstractKey": null
};

(node as any).hash = "b817030e61b0048d8b06e460aa675a51";

export default node;
