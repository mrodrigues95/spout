/**
 * @generated SignedSource<<61038210612db4369cabeb9393d80bb8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type UserProfileColor = "SKY" | "PINK" | "GREEN" | "PURPLE" | "ROSE" | "GRAY" | "ORANGE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Attachments_attachment$data = {
  readonly name: string;
  readonly contentLength: number;
  readonly location: string | null;
  readonly createdAt: string;
  readonly uploadedBy: {
    readonly name: string;
    readonly avatarUrl: string | null;
    readonly profileColor: UserProfileColor;
  };
  readonly " $fragmentType": "Attachments_attachment";
};
export type Attachments_attachment = Attachments_attachment$data;
export type Attachments_attachment$key = {
  readonly " $data"?: Attachments_attachment$data;
  readonly " $fragmentSpreads": FragmentRefs<"Attachments_attachment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Attachments_attachment",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "contentLength",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "location",
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
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "uploadedBy",
      "plural": false,
      "selections": [
        (v0/*: any*/),
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
  "type": "File",
  "abstractKey": null
};
})();

(node as any).hash = "4f64148aa2ed6840e9646876b49fdd7c";

export default node;
