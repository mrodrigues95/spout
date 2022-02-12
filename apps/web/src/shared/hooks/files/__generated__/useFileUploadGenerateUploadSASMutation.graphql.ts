/**
 * @generated SignedSource<<bd6b38c39dd970c2f8d2ecea343cc951>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type WhitelistedFileExtension = "AAC" | "CSV" | "PDF" | "XLS" | "XLSX" | "PPT" | "PPTX" | "BMP" | "GIF" | "JPEG" | "JPG" | "JPE" | "PNG" | "TIFF" | "TIF" | "TXT" | "TEXT" | "RTF" | "DOC" | "DOCX" | "DOT" | "DOTX" | "DWG" | "DWF" | "DXF" | "MP3" | "MP4" | "WAV" | "AVI" | "MOV" | "MPEG" | "WMV" | "ZIP" | "%future added value";
export type GenerateUploadSASInput = {
  fileName: string;
  size: any;
  mimeType?: string | null;
  fileExtension: WhitelistedFileExtension;
};
export type useFileUploadGenerateUploadSASMutation$variables = {
  input: GenerateUploadSASInput;
};
export type useFileUploadGenerateUploadSASMutationVariables = useFileUploadGenerateUploadSASMutation$variables;
export type useFileUploadGenerateUploadSASMutation$data = {
  readonly generateUploadSAS: {
    readonly generateSASPayload: {
      readonly sas: string;
      readonly file: {
        readonly id: string;
        readonly location: string | null;
        readonly name: string;
        readonly contentLength: any;
        readonly extension: WhitelistedFileExtension;
      };
    } | null;
    readonly errors: ReadonlyArray<{
      readonly message?: string;
    }> | null;
  };
};
export type useFileUploadGenerateUploadSASMutationResponse = useFileUploadGenerateUploadSASMutation$data;
export type useFileUploadGenerateUploadSASMutation = {
  variables: useFileUploadGenerateUploadSASMutationVariables;
  response: useFileUploadGenerateUploadSASMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "GenerateSASPayload",
  "kind": "LinkedField",
  "name": "generateSASPayload",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "sas",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "File",
      "kind": "LinkedField",
      "name": "file",
      "plural": false,
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "extension",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "message",
    "storageKey": null
  }
],
v4 = {
  "kind": "InlineFragment",
  "selections": (v3/*: any*/),
  "type": "GenerateSignatureError",
  "abstractKey": null
},
v5 = {
  "kind": "InlineFragment",
  "selections": (v3/*: any*/),
  "type": "ParseSignatureError",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useFileUploadGenerateUploadSASMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GenerateUploadSASPayload",
        "kind": "LinkedField",
        "name": "generateUploadSAS",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useFileUploadGenerateUploadSASMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GenerateUploadSASPayload",
        "kind": "LinkedField",
        "name": "generateUploadSAS",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c2a66386a8213b20d1eb135d00637b87",
    "id": null,
    "metadata": {},
    "name": "useFileUploadGenerateUploadSASMutation",
    "operationKind": "mutation",
    "text": "mutation useFileUploadGenerateUploadSASMutation(\n  $input: GenerateUploadSASInput!\n) {\n  generateUploadSAS(input: $input) {\n    generateSASPayload {\n      sas\n      file {\n        id\n        location\n        name\n        contentLength\n        extension\n      }\n    }\n    errors {\n      __typename\n      ... on GenerateSignatureError {\n        message\n      }\n      ... on ParseSignatureError {\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "aa2b804f1c4cf58b8ea85295debc1627";

export default node;
