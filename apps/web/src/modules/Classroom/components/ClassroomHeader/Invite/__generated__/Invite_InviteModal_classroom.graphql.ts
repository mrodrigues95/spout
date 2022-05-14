/**
 * @generated SignedSource<<f4c6d4348cb114046541fe8c62b71baa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Invite_InviteModal_classroom$data = {
  readonly id: string;
  readonly name: string;
  readonly invites: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"CopyInvite_classroom">;
  }>;
  readonly " $fragmentType": "Invite_InviteModal_classroom";
};
export type Invite_InviteModal_classroom = Invite_InviteModal_classroom$data;
export type Invite_InviteModal_classroom$key = {
  readonly " $data"?: Invite_InviteModal_classroom$data;
  readonly " $fragmentSpreads": FragmentRefs<"Invite_InviteModal_classroom">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "node"
      ],
      "operation": require('./InviteRefetchQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "Invite_InviteModal_classroom",
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
      "concreteType": "ClassroomInvite",
      "kind": "LinkedField",
      "name": "invites",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "CopyInvite_classroom"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Classroom",
  "abstractKey": null
};

(node as any).hash = "10eabb5e641deb757ef44227d1aa9742";

export default node;
