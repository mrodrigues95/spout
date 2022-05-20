/**
 * @generated SignedSource<<6e264f54d0bbcd1b82624bd76859ab18>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityQuery$variables = {
  id: string;
};
export type ActivityQueryVariables = ActivityQuery$variables;
export type ActivityQuery$data = {
  readonly classroomById: {
    readonly " $fragmentSpreads": FragmentRefs<"ActivityList_classroom">;
  };
};
export type ActivityQueryResponse = ActivityQuery$data;
export type ActivityQuery = {
  variables: ActivityQueryVariables;
  response: ActivityQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
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
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 50
  },
  {
    "kind": "Literal",
    "name": "order",
    "value": {
      "createdAt": "DESC"
    }
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
  (v4/*: any*/),
  (v3/*: any*/)
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "content",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ActivityQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Classroom",
        "kind": "LinkedField",
        "name": "classroomById",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ActivityList_classroom"
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
    "name": "ActivityQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Classroom",
        "kind": "LinkedField",
        "name": "classroomById",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "TimelineConnection",
            "kind": "LinkedField",
            "name": "timeline",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "TimelineEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ClassroomTimelineEvent",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "event",
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
                        "name": "triggeredBy",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
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
                          (v4/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Classroom",
                        "kind": "LinkedField",
                        "name": "classroom",
                        "plural": false,
                        "selections": (v5/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Discussion",
                        "kind": "LinkedField",
                        "name": "discussion",
                        "plural": false,
                        "selections": (v5/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ClassroomSyllabus",
                        "kind": "LinkedField",
                        "name": "syllabus",
                        "plural": false,
                        "selections": [
                          (v6/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ClassroomAnnouncement",
                        "kind": "LinkedField",
                        "name": "announcement",
                        "plural": false,
                        "selections": [
                          (v6/*: any*/),
                          (v4/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v4/*: any*/),
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
                    "name": "hasNextPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "timeline(first:50,order:{\"createdAt\":\"DESC\"})"
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "filters": [
              "order"
            ],
            "handle": "connection",
            "key": "ActivityList_timeline",
            "kind": "LinkedHandle",
            "name": "timeline"
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "552380f01c2608bd0c462f97e93e63a1",
    "id": null,
    "metadata": {},
    "name": "ActivityQuery",
    "operationKind": "query",
    "text": "query ActivityQuery(\n  $id: ID!\n) {\n  classroomById(id: $id) {\n    ...ActivityList_classroom\n    id\n  }\n}\n\nfragment ActivityListItem_classroomTimelineEvent on ClassroomTimelineEvent {\n  event\n  createdAt\n  triggeredBy {\n    name\n    avatarUrl\n    profileColor\n    id\n  }\n  classroom {\n    id\n    name\n  }\n  discussion {\n    id\n    name\n  }\n  syllabus {\n    content\n  }\n  announcement {\n    content\n    id\n  }\n}\n\nfragment ActivityList_classroom on Classroom {\n  timeline(first: 50, order: {createdAt: DESC}) {\n    edges {\n      node {\n        ...ActivityListItem_classroomTimelineEvent\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n  id\n}\n"
  }
};
})();

(node as any).hash = "ab2884e6abb4496d23c3fb1dea6783c5";

export default node;
