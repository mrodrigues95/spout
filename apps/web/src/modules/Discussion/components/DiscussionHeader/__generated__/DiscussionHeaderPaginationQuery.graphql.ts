/**
 * @generated SignedSource<<72b9f190b0a895e98cd64a591875e169>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DiscussionHeaderPaginationQuery$variables = {
  count?: number | null;
  cursor?: string | null;
  id: string;
};
export type DiscussionHeaderPaginationQueryVariables = DiscussionHeaderPaginationQuery$variables;
export type DiscussionHeaderPaginationQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"DiscussionHeader_discussion">;
  } | null;
};
export type DiscussionHeaderPaginationQueryResponse = DiscussionHeaderPaginationQuery$data;
export type DiscussionHeaderPaginationQuery = {
  variables: DiscussionHeaderPaginationQueryVariables;
  response: DiscussionHeaderPaginationQuery$data;
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
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = [
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
    "name": "DiscussionHeaderPaginationQuery",
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
            "name": "DiscussionHeader_discussion"
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
    "name": "DiscussionHeaderPaginationQuery",
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
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Classroom",
                "kind": "LinkedField",
                "name": "classroom",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": (v5/*: any*/),
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
                              (v4/*: any*/),
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
                    "args": (v5/*: any*/),
                    "filters": [
                      "order"
                    ],
                    "handle": "connection",
                    "key": "DiscussionHeader_classroom_discussions",
                    "kind": "LinkedHandle",
                    "name": "discussions"
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "Discussion",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "bcb18f9b6c3b18fa46bb690d66571d48",
    "id": null,
    "metadata": {},
    "name": "DiscussionHeaderPaginationQuery",
    "operationKind": "query",
    "text": "query DiscussionHeaderPaginationQuery(\n  $count: Int = 50\n  $cursor: String\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...DiscussionHeader_discussion_1G22uz\n    id\n  }\n}\n\nfragment DiscussionHeader_discussion_1G22uz on Discussion {\n  id\n  name\n  classroom {\n    id\n    discussions(first: $count, after: $cursor, order: {name: ASC}) {\n      edges {\n        node {\n          id\n          name\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "be7ca1d5d5c7c100d030bab2db67e462";

export default node;
