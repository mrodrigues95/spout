/**
 * @generated SignedSource<<589db70ff5cefa8e01fd74a5a7ea8e6c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteFileInput = {
  fileId: string;
};
export type useFileUploadQueueMutation$variables = {
  input: DeleteFileInput;
};
export type useFileUploadQueueMutationVariables = useFileUploadQueueMutation$variables;
export type useFileUploadQueueMutation$data = {
  readonly deleteFile: {
    readonly file: {
      readonly id: string;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly message?: string;
    }> | null;
  };
};
export type useFileUploadQueueMutationResponse = useFileUploadQueueMutation$data;
export type useFileUploadQueueMutation = {
  variables: useFileUploadQueueMutationVariables;
  response: useFileUploadQueueMutation$data;
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
    "name": "useFileUploadQueueMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteFilePayload",
        "kind": "LinkedField",
        "name": "deleteFile",
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
    "name": "useFileUploadQueueMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteFilePayload",
        "kind": "LinkedField",
        "name": "deleteFile",
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
    "cacheID": "c0a12b1d6b80b56a4e399d59550a442a",
    "id": null,
    "metadata": {},
    "name": "useFileUploadQueueMutation",
    "operationKind": "mutation",
    "text": "mutation useFileUploadQueueMutation(\n  $input: DeleteFileInput!\n) {\n  deleteFile(input: $input) {\n    file {\n      id\n    }\n    errors {\n      __typename\n      ... on Error {\n        __isError: __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "cc5806ef06ad01760f3bc7983c25aad7";

export default node;
