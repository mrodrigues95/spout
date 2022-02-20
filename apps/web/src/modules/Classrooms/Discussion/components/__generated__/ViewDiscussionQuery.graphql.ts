/**
 * @generated SignedSource<<60911d520538b49721d465d45e9e34aa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewDiscussionQuery$variables = {
  id: string;
  count: number;
  cursor?: string | null;
};
export type ViewDiscussionQueryVariables = ViewDiscussionQuery$variables;
export type ViewDiscussionQuery$data = {
  readonly discussionById: {
    readonly id: string;
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"DiscussionHeader_discussion" | "DiscussionDetails_discussion" | "DiscussionMessagesList_discussion" | "DiscussionMessageComposer_discussion">;
  };
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"DiscussionMessagesList_user" | "DiscussionMessageComposer_user">;
  } | null;
};
export type ViewDiscussionQueryResponse = ViewDiscussionQuery$data;
export type ViewDiscussionQuery = {
  variables: ViewDiscussionQueryVariables;
  response: ViewDiscussionQuery$data;
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
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = [
  (v4/*: any*/),
  (v5/*: any*/)
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatarUrl",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "profileColor",
  "storageKey": null
},
v9 = [
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
      "createdAt": "ASC"
    }
  }
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "content",
  "storageKey": null
},
v11 = [
  (v4/*: any*/),
  (v5/*: any*/),
  (v7/*: any*/),
  (v8/*: any*/)
],
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "createdBy",
  "plural": false,
  "selections": (v11/*: any*/),
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
    "name": "ViewDiscussionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Discussion",
        "kind": "LinkedField",
        "name": "discussionById",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "DiscussionHeader_discussion"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "DiscussionDetails_discussion"
          },
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
            "name": "DiscussionMessagesList_discussion"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "DiscussionMessageComposer_discussion"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "DiscussionMessagesList_user"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "DiscussionMessageComposer_user"
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
    "name": "ViewDiscussionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Discussion",
        "kind": "LinkedField",
        "name": "discussionById",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Classroom",
            "kind": "LinkedField",
            "name": "classroom",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Discussion",
                "kind": "LinkedField",
                "name": "discussions",
                "plural": true,
                "selections": (v6/*: any*/),
                "storageKey": null
              },
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "users",
                "plural": true,
                "selections": [
                  (v4/*: any*/),
                  (v7/*: any*/),
                  (v5/*: any*/),
                  (v8/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "topic",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "description",
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v9/*: any*/),
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
                      (v4/*: any*/),
                      (v10/*: any*/),
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
                        "name": "isEvent",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "messageEvent",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "File",
                        "kind": "LinkedField",
                        "name": "attachments",
                        "plural": true,
                        "selections": [
                          (v4/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "location",
                            "storageKey": null
                          },
                          (v5/*: any*/),
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
                      },
                      (v12/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "User",
                        "kind": "LinkedField",
                        "name": "pinnedBy",
                        "plural": false,
                        "selections": (v6/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Message",
                        "kind": "LinkedField",
                        "name": "parentMessage",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          (v10/*: any*/),
                          (v12/*: any*/)
                        ],
                        "storageKey": null
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
            "args": (v9/*: any*/),
            "filters": [
              "order"
            ],
            "handle": "connection",
            "key": "DiscussionMessagesList_discussion_messages",
            "kind": "LinkedHandle",
            "name": "messages"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": (v11/*: any*/),
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3fc2ab4123e4554806bf4d9ae2cd680b",
    "id": null,
    "metadata": {},
    "name": "ViewDiscussionQuery",
    "operationKind": "query",
    "text": "query ViewDiscussionQuery(\n  $id: ID!\n  $count: Int!\n  $cursor: String\n) {\n  discussionById(id: $id) {\n    id\n    name\n    ...DiscussionHeader_discussion\n    ...DiscussionDetails_discussion\n    ...DiscussionMessagesList_discussion_1G22uz\n    ...DiscussionMessageComposer_discussion\n  }\n  me {\n    ...DiscussionMessagesList_user\n    ...DiscussionMessageComposer_user\n    id\n  }\n}\n\nfragment Description_discussion on Discussion {\n  id\n  description\n}\n\nfragment DiscussionDetails_discussion on Discussion {\n  name\n  ...Topic_discussion\n  ...Description_discussion\n  classroom {\n    name\n    ...Participants_classroom\n    id\n  }\n}\n\nfragment DiscussionHeader_discussion on Discussion {\n  id\n  name\n  classroom {\n    id\n    discussions {\n      id\n      name\n    }\n  }\n}\n\nfragment DiscussionMessageComposer_discussion on Discussion {\n  id\n  name\n}\n\nfragment DiscussionMessageComposer_user on User {\n  id\n  name\n  avatarUrl\n  profileColor\n}\n\nfragment DiscussionMessagesListHeader_discussion on Discussion {\n  name\n  topic\n  description\n}\n\nfragment DiscussionMessagesList_discussion_1G22uz on Discussion {\n  id\n  ...DiscussionMessagesListHeader_discussion\n  messages(last: $count, before: $cursor, order: {createdAt: ASC}) {\n    edges {\n      node {\n        id\n        content\n        createdAt\n        isEvent\n        messageEvent\n        attachments {\n          id\n          location\n          name\n          contentLength\n          extension\n        }\n        createdBy {\n          id\n          name\n          avatarUrl\n          profileColor\n        }\n        pinnedBy {\n          id\n          name\n        }\n        parentMessage {\n          id\n          content\n          createdBy {\n            id\n            name\n            avatarUrl\n            profileColor\n          }\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n\nfragment DiscussionMessagesList_user on User {\n  id\n  name\n  avatarUrl\n  profileColor\n}\n\nfragment Participants_classroom on Classroom {\n  users {\n    id\n    avatarUrl\n    name\n    profileColor\n  }\n}\n\nfragment Topic_discussion on Discussion {\n  id\n  topic\n}\n"
  }
};
})();

(node as any).hash = "c30791d5751479f4ddbb8a52900df8d6";

export default node;
