/**
 * @generated SignedSource<<ed5b1a7bf45d120eea3f649f6d9dd3ec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CopyInvite_classroom$data = {
  readonly code: string;
  readonly maxUses: number | null;
  readonly maxAge: number | null;
  readonly " $fragmentType": "CopyInvite_classroom";
};
export type CopyInvite_classroom = CopyInvite_classroom$data;
export type CopyInvite_classroom$key = {
  readonly " $data"?: CopyInvite_classroom$data;
  readonly " $fragmentSpreads": FragmentRefs<"CopyInvite_classroom">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CopyInvite_classroom",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "code",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "maxUses",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "maxAge",
      "storageKey": null
    }
  ],
  "type": "ClassroomInvite",
  "abstractKey": null
};

(node as any).hash = "909e96e0882590df9a413ee04ba3208e";

export default node;
