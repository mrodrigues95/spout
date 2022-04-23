/**
 * @generated SignedSource<<4605f5ce07ba43039bde0f09180342b6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type UserProfileColor = "SKY" | "PINK" | "GREEN" | "PURPLE" | "ROSE" | "GRAY" | "ORANGE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Announcement_classroomAnnouncement$data = {
  readonly id: string;
  readonly content: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly createdBy: {
    readonly name: string;
    readonly avatarUrl: string | null;
    readonly profileColor: UserProfileColor;
  };
  readonly " $fragmentType": "Announcement_classroomAnnouncement";
};
export type Announcement_classroomAnnouncement = Announcement_classroomAnnouncement$data;
export type Announcement_classroomAnnouncement$key = {
  readonly " $data"?: Announcement_classroomAnnouncement$data;
  readonly " $fragmentSpreads": FragmentRefs<"Announcement_classroomAnnouncement">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Announcement_classroomAnnouncement",
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
      "name": "content",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "updatedAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "createdBy",
      "plural": false,
      "selections": [
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ClassroomAnnouncement",
  "abstractKey": null
};

(node as any).hash = "b3a64efb6769a1f777a7dc79b967ce67";

export default node;
