/**
 * @generated SignedSource<<217cad4cfb7479930ff7562ed09f18d6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewDiscussionQuery$variables = {
  discussionId: string;
  classroomId: string;
  count: number;
  cursor?: string | null;
};
export type ViewDiscussionQueryVariables = ViewDiscussionQuery$variables;
export type ViewDiscussionQuery$data = {
  readonly discussionById: {
    readonly id: string;
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"DiscussionHeader_discussion" | "DiscussionDetails_discussion" | "DiscussionMessagesList_discussion" | "DiscussionMessageComposer_discussion">;
  } | null;
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"DiscussionMessagesList_user" | "DiscussionMessageComposer_user" | "DiscussionDetails_user">;
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
  "name": "classroomId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "count"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "cursor"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "discussionId"
},
v4 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "discussionId"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = [
  {
    "kind": "Variable",
    "name": "classroomId",
    "variableName": "classroomId"
  }
],
v8 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 50
  },
  {
    "kind": "Literal",
    "name": "order",
    "value": {
      "name": "ASC"
    }
  }
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v11 = [
  "order"
],
v12 = [
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
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "content",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatarUrl",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "profileColor",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "createdBy",
  "plural": false,
  "selections": [
    (v5/*: any*/),
    (v6/*: any*/),
    (v14/*: any*/),
    (v15/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ViewDiscussionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "Discussion",
        "kind": "LinkedField",
        "name": "discussionById",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          (v6/*: any*/),
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
            "args": (v7/*: any*/),
            "kind": "FragmentSpread",
            "name": "DiscussionMessagesList_user"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "DiscussionMessageComposer_user"
          },
          {
            "args": (v7/*: any*/),
            "kind": "FragmentSpread",
            "name": "DiscussionDetails_user"
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
      (v3/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "ViewDiscussionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "Discussion",
        "kind": "LinkedField",
        "name": "discussionById",
        "plural": false,
        "selections": [
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Classroom",
            "kind": "LinkedField",
            "name": "classroom",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              {
                "alias": null,
                "args": (v8/*: any*/),
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
                          (v5/*: any*/),
                          (v6/*: any*/),
                          (v9/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v10/*: any*/)
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
                "storageKey": "discussions(first:50,order:{\"name\":\"ASC\"})"
              },
              {
                "alias": null,
                "args": (v8/*: any*/),
                "filters": (v11/*: any*/),
                "handle": "connection",
                "key": "DiscussionHeader_classroom_discussions",
                "kind": "LinkedHandle",
                "name": "discussions"
              },
              (v6/*: any*/)
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
            "args": (v12/*: any*/),
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
                      (v5/*: any*/),
                      (v13/*: any*/),
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
                          (v5/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "location",
                            "storageKey": null
                          },
                          (v6/*: any*/),
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
                      (v16/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "User",
                        "kind": "LinkedField",
                        "name": "pinnedBy",
                        "plural": false,
                        "selections": [
                          (v5/*: any*/),
                          (v6/*: any*/)
                        ],
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
                          (v5/*: any*/),
                          (v13/*: any*/),
                          (v16/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v10/*: any*/)
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
            "args": (v12/*: any*/),
            "filters": (v11/*: any*/),
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
        "selections": [
          (v5/*: any*/),
          (v6/*: any*/),
          (v14/*: any*/),
          (v15/*: any*/),
          {
            "alias": null,
            "args": (v7/*: any*/),
            "kind": "ScalarField",
            "name": "isClassroomTeacher",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "602902ce6b3eb910c4e0a56728c47319",
    "id": null,
    "metadata": {},
    "name": "ViewDiscussionQuery",
    "operationKind": "query",
    "text": "query ViewDiscussionQuery(\n  $discussionId: ID!\n  $classroomId: ID!\n  $count: Int!\n  $cursor: String\n) {\n  discussionById(id: $discussionId) {\n    id\n    name\n    ...DiscussionHeader_discussion\n    ...DiscussionDetails_discussion\n    ...DiscussionMessagesList_discussion_1G22uz\n    ...DiscussionMessageComposer_discussion\n  }\n  me {\n    ...DiscussionMessagesList_user_4zj0ro\n    ...DiscussionMessageComposer_user\n    ...DiscussionDetails_user_4zj0ro\n    id\n  }\n}\n\nfragment Description_discussion on Discussion {\n  id\n  description\n}\n\nfragment Description_user_4zj0ro on User {\n  isClassroomTeacher(classroomId: $classroomId)\n}\n\nfragment DiscussionDetails_discussion on Discussion {\n  name\n  ...Topic_discussion\n  ...Description_discussion\n  classroom {\n    name\n    id\n  }\n}\n\nfragment DiscussionDetails_user_4zj0ro on User {\n  ...Description_user_4zj0ro\n  ...Topic_user_4zj0ro\n}\n\nfragment DiscussionHeader_discussion on Discussion {\n  id\n  name\n  classroom {\n    id\n    discussions(first: 50, order: {name: ASC}) {\n      edges {\n        node {\n          id\n          name\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n\nfragment DiscussionMessageComposer_discussion on Discussion {\n  id\n  name\n}\n\nfragment DiscussionMessageComposer_user on User {\n  id\n  name\n  avatarUrl\n  profileColor\n}\n\nfragment DiscussionMessagesListHeader_discussion on Discussion {\n  name\n  topic\n  description\n}\n\nfragment DiscussionMessagesList_discussion_1G22uz on Discussion {\n  id\n  ...DiscussionMessagesListHeader_discussion\n  messages(last: $count, before: $cursor, order: {createdAt: ASC}) {\n    edges {\n      node {\n        id\n        content\n        createdAt\n        isEvent\n        messageEvent\n        attachments {\n          id\n          location\n          name\n          contentLength\n        }\n        createdBy {\n          id\n          name\n          avatarUrl\n          profileColor\n        }\n        pinnedBy {\n          id\n          name\n        }\n        parentMessage {\n          id\n          content\n          createdBy {\n            id\n            name\n            avatarUrl\n            profileColor\n          }\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n\nfragment DiscussionMessagesList_user_4zj0ro on User {\n  id\n  name\n  avatarUrl\n  profileColor\n  isClassroomTeacher(classroomId: $classroomId)\n}\n\nfragment Topic_discussion on Discussion {\n  id\n  topic\n}\n\nfragment Topic_user_4zj0ro on User {\n  isClassroomTeacher(classroomId: $classroomId)\n}\n"
  }
};
})();

(node as any).hash = "c5e2b755cde8285c423d1f939cbeaa79";

export default node;
