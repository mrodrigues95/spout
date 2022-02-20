/**
 * @generated SignedSource<<85caa61b3bae9ed11a4059e668c30777>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type UserProfileColor = "SKY" | "PINK" | "GREEN" | "PURPLE" | "ROSE" | "GRAY" | "ORANGE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Participants_classroom$data = {
  readonly users: ReadonlyArray<{
    readonly id: string;
    readonly avatarUrl: string | null;
    readonly name: string;
    readonly profileColor: UserProfileColor;
  }>;
  readonly " $fragmentType": "Participants_classroom";
};
export type Participants_classroom = Participants_classroom$data;
export type Participants_classroom$key = {
  readonly " $data"?: Participants_classroom$data;
  readonly " $fragmentSpreads": FragmentRefs<"Participants_classroom">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Participants_classroom",
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

(node as any).hash = "710fcf5be2320c192798fd46dd16d85a";

export default node;
