/**
 * @generated SignedSource<<f41a92231f537c8b479c17fa5d94d5ab>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DiscussionHeaderPinnedMessagesQuery$variables = {
  id: string;
  count: number;
  cursor?: string | null;
};
export type DiscussionHeaderPinnedMessagesQueryVariables = DiscussionHeaderPinnedMessagesQuery$variables;
export type DiscussionHeaderPinnedMessagesQuery$data = {
  readonly discussionById: {
    readonly " $fragmentSpreads": FragmentRefs<"DiscussionHeaderPinnedMessages_list">;
  } | null;
};
export type DiscussionHeaderPinnedMessagesQueryResponse = DiscussionHeaderPinnedMessagesQuery$data;
export type DiscussionHeaderPinnedMessagesQuery = {
  variables: DiscussionHeaderPinnedMessagesQueryVariables;
  response: DiscussionHeaderPinnedMessagesQuery$data;
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
    "name": "id",
    "variableName": "id"
  }
],
v4 = [
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
      "pinnedAt": "DESC"
    }
  },
  {
    "kind": "Literal",
    "name": "where",
    "value": {
      "pinnedAt": {
        "neq": null
      }
    }
  }
],
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
    "name": "DiscussionHeaderPinnedMessagesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Discussion",
        "kind": "LinkedField",
        "name": "discussionById",
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
            "name": "DiscussionHeaderPinnedMessages_list"
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
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "DiscussionHeaderPinnedMessagesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Discussion",
        "kind": "LinkedField",
        "name": "discussionById",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "MessagesConnection",
            "kind": "LinkedField",
            "name": "messages",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "MessagesEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Message",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "content",
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
                        "kind": "ScalarField",
                        "name": "pinnedAt",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "User",
                        "kind": "LinkedField",
                        "name": "createdBy",
                        "plural": false,
                        "selections": [
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
                    "name": "hasPreviousPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "startCursor",
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
              "order",
              "where"
            ],
            "handle": "connection",
            "key": "DiscussionHeaderPinnedMessagesList_discussion_messages",
            "kind": "LinkedHandle",
            "name": "messages"
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3f0430b257cb290d176ea665d919643c",
    "id": null,
    "metadata": {},
    "name": "DiscussionHeaderPinnedMessagesQuery",
    "operationKind": "query",
    "text": "query DiscussionHeaderPinnedMessagesQuery(\n  $id: ID!\n  $count: Int!\n  $cursor: String\n) {\n  discussionById(id: $id) {\n    ...DiscussionHeaderPinnedMessages_list_1G22uz\n    id\n  }\n}\n\nfragment DiscussionHeaderPinnedMessages_list_1G22uz on Discussion {\n  messages(last: $count, before: $cursor, order: {pinnedAt: DESC}, where: {pinnedAt: {neq: null}}) {\n    edges {\n      node {\n        ...DiscussionHeaderPinnedMessages_message\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasPreviousPage\n      startCursor\n    }\n  }\n  id\n}\n\nfragment DiscussionHeaderPinnedMessages_message on Message {\n  content\n  createdAt\n  pinnedAt\n  createdBy {\n    name\n    avatarUrl\n    profileColor\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "e11fd1ded185559d8a78fd6db38acb35";

export default node;
