/**
 * @generated SignedSource<<10f53aa9b481947c7ca583703cedf31e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Attachments_files$data = {
  readonly files: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"Attachments_attachment">;
      };
    }> | null;
    readonly pageInfo: {
      readonly startCursor: string | null;
    };
  } | null;
  readonly " $fragmentType": "Attachments_files";
};
export type Attachments_files = Attachments_files$data;
export type Attachments_files$key = {
  readonly " $data"?: Attachments_files$data;
  readonly " $fragmentSpreads": FragmentRefs<"Attachments_files">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "files"
];
return {
  "argumentDefinitions": [
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
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "backward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": null,
        "backward": {
          "count": "count",
          "cursor": "cursor"
        },
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": require('./AttachmentsPaginationQuery.graphql')
    }
  },
  "name": "Attachments_files",
  "selections": [
    {
      "alias": "files",
      "args": [
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
      "concreteType": "FilesConnection",
      "kind": "LinkedField",
      "name": "__Attachments_file_files_connection",
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
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "Attachments_attachment"
                },
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
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "9831fea9fddb2560d338e9ffce931964";

export default node;
