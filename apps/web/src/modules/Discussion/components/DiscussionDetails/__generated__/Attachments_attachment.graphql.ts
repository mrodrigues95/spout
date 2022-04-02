/**
 * @generated SignedSource<<ced55b573afbe9c41a3ef04f715c8266>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type UserProfileColor = "SKY" | "PINK" | "GREEN" | "PURPLE" | "ROSE" | "GRAY" | "ORANGE" | "%future added value";
export type WhitelistedFileExtension = "AAC" | "CSV" | "PDF" | "XLS" | "XLSX" | "PPT" | "PPTX" | "BMP" | "GIF" | "JPEG" | "JPG" | "JPE" | "PNG" | "TIFF" | "TIF" | "TXT" | "TEXT" | "RTF" | "DOC" | "DOCX" | "DOT" | "DOTX" | "DWG" | "DWF" | "DXF" | "MP3" | "MP4" | "WAV" | "AVI" | "MOV" | "MPEG" | "WMV" | "ZIP" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Attachments_attachment$data = {
  readonly name: string;
  readonly contentLength: any;
  readonly extension: WhitelistedFileExtension;
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
      "name": "extension",
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

(node as any).hash = "c9bc15800541c9940f9f40ba121f55a3";

export default node;
