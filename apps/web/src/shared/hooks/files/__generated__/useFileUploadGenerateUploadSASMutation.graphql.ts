/**
 * @generated SignedSource<<9eef2833c6bc78216613e5ae054e7d5b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type GenerateUploadSASInput = {
  fileName: string;
  size: any;
  mimeType?: string | null;
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
      };
    } | null;
    readonly errors: ReadonlyArray<{
      readonly __typename: "FileTypeNotAllowedError";
      readonly message: string;
    } | {
      readonly __typename: "ParseSignatureError";
      readonly message: string;
    } | {
      readonly __typename: "GenerateSignatureError";
      readonly message: string;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
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
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v5 = [
  (v3/*: any*/),
  (v4/*: any*/)
],
v6 = [
  (v4/*: any*/)
];
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
              {
                "kind": "InlineFragment",
                "selections": (v5/*: any*/),
                "type": "FileTypeNotAllowedError",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v5/*: any*/),
                "type": "ParseSignatureError",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v5/*: any*/),
                "type": "GenerateSignatureError",
                "abstractKey": null
              }
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
              (v3/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v6/*: any*/),
                "type": "FileTypeNotAllowedError",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v6/*: any*/),
                "type": "ParseSignatureError",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v6/*: any*/),
                "type": "GenerateSignatureError",
                "abstractKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c120cbb4b49723c83f334ffe51340632",
    "id": null,
    "metadata": {},
    "name": "useFileUploadGenerateUploadSASMutation",
    "operationKind": "mutation",
    "text": "mutation useFileUploadGenerateUploadSASMutation(\n  $input: GenerateUploadSASInput!\n) {\n  generateUploadSAS(input: $input) {\n    generateSASPayload {\n      sas\n      file {\n        id\n        location\n        name\n        contentLength\n      }\n    }\n    errors {\n      __typename\n      ... on FileTypeNotAllowedError {\n        __typename\n        message\n      }\n      ... on ParseSignatureError {\n        __typename\n        message\n      }\n      ... on GenerateSignatureError {\n        __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "fc088dc661140d1fac1c04341642e1ce";

export default node;
