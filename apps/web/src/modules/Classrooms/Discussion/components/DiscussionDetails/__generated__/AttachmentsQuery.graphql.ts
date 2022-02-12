/**
 * @generated SignedSource<<adad0336a0178e0c6a0894ff986d7e53>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AttachmentsQuery$variables = {
  id: string;
  count: number;
  cursor?: string | null;
};
export type AttachmentsQueryVariables = AttachmentsQuery$variables;
export type AttachmentsQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"Attachments_files">;
};
export type AttachmentsQueryResponse = AttachmentsQuery$data;
export type AttachmentsQuery = {
  variables: AttachmentsQueryVariables;
  response: AttachmentsQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "count"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "cursor"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v3 = [
  {
    "kind": "Variable",
    "name": "before",
    "variableName": "cursor"
  },
  {
    "kind": "Variable",
    "name": "last",
    "variableName": "count"
  },
  {
    "kind": "Literal",
    "name": "order",
    "value": {
      "createdAt": "DESC"
    }
  },
  {
    "fields": [
      {
        "kind": "Literal",
        "name": "and",
        "value": {
          "isDeleted": {
            "eq": false
          },
          "uploadStatus": {
            "eq": "COMPLETED"
          }
        }
      },
      {
        "fields": [
          {
            "fields": [
              {
                "fields": [
                  {
                    "fields": [
                      {
                        "fields": [
                          {
                            "kind": "Variable",
                            "name": "eq",
                            "variableName": "id"
                          }
                        ],
                        "kind": "ObjectValue",
                        "name": "id"
                      }
                    ],
                    "kind": "ObjectValue",
                    "name": "discussion"
                  }
                ],
                "kind": "ObjectValue",
                "name": "message"
              }
            ],
            "kind": "ObjectValue",
            "name": "some"
          }
        ],
        "kind": "ObjectValue",
        "name": "messageFiles"
      }
    ],
    "kind": "ObjectValue",
    "name": "where"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AttachmentsQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "count",
            "variableName": "count"
          },
          {
            "kind": "Variable",
            "name": "cursor",
            "variableName": "cursor"
          },
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id"
          }
        ],
        "kind": "FragmentSpread",
        "name": "Attachments_files"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "AttachmentsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "FilesConnection",
        "kind": "LinkedField",
        "name": "files",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "FilesEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "File",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
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
                      (v4/*: any*/),
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
                      },
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "startCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasPreviousPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v3/*: any*/),
        "filters": [
          "where",
          "order"
        ],
        "handle": "connection",
        "key": "Attachments_file_files",
        "kind": "LinkedHandle",
        "name": "files"
      }
    ]
  },
  "params": {
    "cacheID": "b4d1859efd0bd8031a2bab41d986ed40",
    "id": null,
    "metadata": {},
    "name": "AttachmentsQuery",
    "operationKind": "query",
    "text": "query AttachmentsQuery(\n  $id: ID!\n  $count: Int!\n  $cursor: String\n) {\n  ...Attachments_files_3T5kGn\n}\n\nfragment Attachments_attachment on File {\n  name\n  contentLength\n  extension\n  location\n  createdAt\n  uploadedBy {\n    name\n    avatarUrl\n    profileColor\n    id\n  }\n}\n\nfragment Attachments_files_3T5kGn on Query {\n  files(last: $count, before: $cursor, where: {messageFiles: {some: {message: {discussion: {id: {eq: $id}}}}}, and: {isDeleted: {eq: false}, uploadStatus: {eq: COMPLETED}}}, order: {createdAt: DESC}) {\n    edges {\n      node {\n        ...Attachments_attachment\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      startCursor\n      hasPreviousPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2c87427e3b130d4121d791cecdfdd28d";

export default node;
