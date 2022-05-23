/**
 * @generated SignedSource<<5ce40194de2b4b85af446070ec5be949>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AttachmentsPaginationQuery$variables = {
  count: number;
  cursor?: string | null;
  id: string;
};
export type AttachmentsPaginationQueryVariables = AttachmentsPaginationQuery$variables;
export type AttachmentsPaginationQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"Attachments_files">;
};
export type AttachmentsPaginationQueryResponse = AttachmentsPaginationQuery$data;
export type AttachmentsPaginationQuery = {
  variables: AttachmentsPaginationQueryVariables;
  response: AttachmentsPaginationQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "count"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cursor"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AttachmentsPaginationQuery",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AttachmentsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
                  (v2/*: any*/),
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
                      (v2/*: any*/),
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
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v3/*: any*/),
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
        "args": (v1/*: any*/),
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
    "cacheID": "7c2301720b691944d6ab89378dfc65b7",
    "id": null,
    "metadata": {},
    "name": "AttachmentsPaginationQuery",
    "operationKind": "query",
    "text": "query AttachmentsPaginationQuery(\n  $count: Int!\n  $cursor: String\n  $id: ID!\n) {\n  ...Attachments_files_3T5kGn\n}\n\nfragment Attachments_attachment on File {\n  name\n  contentLength\n  location\n  createdAt\n  uploadedBy {\n    name\n    avatarUrl\n    profileColor\n    id\n  }\n}\n\nfragment Attachments_files_3T5kGn on Query {\n  files(last: $count, before: $cursor, where: {messageFiles: {some: {message: {discussion: {id: {eq: $id}}}}}, and: {isDeleted: {eq: false}, uploadStatus: {eq: COMPLETED}}}, order: {createdAt: DESC}) {\n    edges {\n      node {\n        ...Attachments_attachment\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      startCursor\n      hasPreviousPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "9831fea9fddb2560d338e9ffce931964";

export default node;
