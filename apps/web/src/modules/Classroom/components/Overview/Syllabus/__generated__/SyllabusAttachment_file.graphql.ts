/**
 * @generated SignedSource<<12560f7580ad68dfb7a32b2f00d3bd62>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SyllabusAttachment_file$data = {
  readonly id: string;
  readonly location: string | null;
  readonly name: string;
  readonly contentLength: number;
  readonly " $fragmentType": "SyllabusAttachment_file";
};
export type SyllabusAttachment_file = SyllabusAttachment_file$data;
export type SyllabusAttachment_file$key = {
  readonly " $data"?: SyllabusAttachment_file$data;
  readonly " $fragmentSpreads": FragmentRefs<"SyllabusAttachment_file">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SyllabusAttachment_file",
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
      "name": "location",
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
      "name": "contentLength",
      "storageKey": null
    }
  ],
  "type": "File",
  "abstractKey": null
};

(node as any).hash = "259e134c1d48e789803b3c1b51ca9055";

export default node;
