/**
 * @generated SignedSource<<8ed651eb2fc67226054e778b99bd62ca>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CompleteUploadInput = {
  fileId: string;
};
export type useFileUploadCompleteUploadMutation$variables = {
  input: CompleteUploadInput;
};
export type useFileUploadCompleteUploadMutationVariables = useFileUploadCompleteUploadMutation$variables;
export type useFileUploadCompleteUploadMutation$data = {
  readonly completeUpload: {
    readonly file: {
      readonly id: string;
      readonly location: string | null;
      readonly name: string;
      readonly contentLength: number;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly message?: string;
    }> | null;
  };
};
export type useFileUploadCompleteUploadMutationResponse = useFileUploadCompleteUploadMutation$data;
export type useFileUploadCompleteUploadMutation = {
  variables: useFileUploadCompleteUploadMutationVariables;
  response: useFileUploadCompleteUploadMutation$data;
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
},
v3 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "message",
      "storageKey": null
    }
  ],
  "type": "Error",
  "abstractKey": "__isError"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useFileUploadCompleteUploadMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CompleteUploadPayload",
        "kind": "LinkedField",
        "name": "completeUpload",
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
              (v3/*: any*/)
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
    "name": "useFileUploadCompleteUploadMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CompleteUploadPayload",
        "kind": "LinkedField",
        "name": "completeUpload",
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
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8026360d40cf768cfc3de4fe277a332a",
    "id": null,
    "metadata": {},
    "name": "useFileUploadCompleteUploadMutation",
    "operationKind": "mutation",
    "text": "mutation useFileUploadCompleteUploadMutation(\n  $input: CompleteUploadInput!\n) {\n  completeUpload(input: $input) {\n    file {\n      id\n      location\n      name\n      contentLength\n    }\n    errors {\n      __typename\n      ... on Error {\n        __isError: __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "bb762793e27c91ceaed08fcab8b31464";

export default node;
