/**
 * @generated SignedSource<<5f0d56360622fc3f934fc89dd64ddbf2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DiscussionsMenuListPaginationQuery$variables = {
  count?: number | null;
  cursor?: string | null;
  id: string;
};
export type DiscussionsMenuListPaginationQueryVariables = DiscussionsMenuListPaginationQuery$variables;
export type DiscussionsMenuListPaginationQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"DiscussionsMenu_discussions">;
  } | null;
};
export type DiscussionsMenuListPaginationQueryResponse = DiscussionsMenuListPaginationQuery$data;
export type DiscussionsMenuListPaginationQuery = {
  variables: DiscussionsMenuListPaginationQueryVariables;
  response: DiscussionsMenuListPaginationQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": 50,
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
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  },
  {
    "kind": "Literal",
    "name": "order",
    "value": {
      "name": "ASC"
    }
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "DiscussionsMenuListPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
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
              }
            ],
            "kind": "FragmentSpread",
            "name": "DiscussionsMenu_discussions"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DiscussionsMenuListPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": (v4/*: any*/),
                "concreteType": "DiscussionsConnection",
                "kind": "LinkedField",
                "name": "discussions",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "DiscussionsEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Discussion",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "name",
                            "storageKey": null
                          },
                          (v2/*: any*/)
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
                        "name": "endCursor",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "hasNextPage",
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
                "args": (v4/*: any*/),
                "filters": [
                  "order"
                ],
                "handle": "connection",
                "key": "DiscussionsMenu_discussions",
                "kind": "LinkedHandle",
                "name": "discussions"
              }
            ],
            "type": "Classroom",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5233c011a0be5a635b9988a8175b33d0",
    "id": null,
    "metadata": {},
    "name": "DiscussionsMenuListPaginationQuery",
    "operationKind": "query",
    "text": "query DiscussionsMenuListPaginationQuery(\n  $count: Int = 50\n  $cursor: String\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...DiscussionsMenu_discussions_1G22uz\n    id\n  }\n}\n\nfragment CreateDiscussion_classroom on Classroom {\n  id\n}\n\nfragment DiscussionsMenu_discussions_1G22uz on Classroom {\n  id\n  ...CreateDiscussion_classroom\n  discussions(first: $count, after: $cursor, order: {name: ASC}) {\n    edges {\n      node {\n        id\n        name\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "284ab578734033a8c5edd467872ea823";

export default node;
