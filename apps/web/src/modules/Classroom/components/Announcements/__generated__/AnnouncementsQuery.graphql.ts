/**
 * @generated SignedSource<<44fda44f599dd48252199349767480f6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AnnouncementsQuery$variables = {
  id: string;
  count: number;
  cursor?: string | null;
};
export type AnnouncementsQueryVariables = AnnouncementsQuery$variables;
export type AnnouncementsQuery$data = {
  readonly classroomById: {
    readonly " $fragmentSpreads": FragmentRefs<"CreateAnnouncement_classroom" | "AnnouncementsList_classroom">;
  } | null;
  readonly me: {
    readonly isClassroomTeacher: boolean;
    readonly " $fragmentSpreads": FragmentRefs<"AnnouncementsList_user">;
  } | null;
};
export type AnnouncementsQueryResponse = AnnouncementsQuery$data;
export type AnnouncementsQuery = {
  variables: AnnouncementsQueryVariables;
  response: AnnouncementsQuery$data;
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
    "name": "classroomId",
    "variableName": "id"
  }
],
v5 = {
  "alias": null,
  "args": (v4/*: any*/),
  "kind": "ScalarField",
  "name": "isClassroomTeacher",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = [
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
      "createdAt": "DESC"
    }
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AnnouncementsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Classroom",
        "kind": "LinkedField",
        "name": "classroomById",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CreateAnnouncement_classroom"
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
            "name": "AnnouncementsList_classroom"
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
          {
            "args": (v4/*: any*/),
            "kind": "FragmentSpread",
            "name": "AnnouncementsList_user"
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
    "name": "AnnouncementsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Classroom",
        "kind": "LinkedField",
        "name": "classroomById",
        "plural": false,
        "selections": [
          (v6/*: any*/),
          {
            "alias": null,
            "args": (v7/*: any*/),
            "concreteType": "AnnouncementsConnection",
            "kind": "LinkedField",
            "name": "announcements",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "AnnouncementsEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ClassroomAnnouncement",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
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
                        "name": "updatedAt",
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
                          (v6/*: any*/)
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
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v7/*: any*/),
            "filters": [
              "order"
            ],
            "handle": "connection",
            "key": "AnnouncementsList_announcements",
            "kind": "LinkedHandle",
            "name": "announcements"
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
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ef1e3825b7d530b1206eaf206a170dcb",
    "id": null,
    "metadata": {},
    "name": "AnnouncementsQuery",
    "operationKind": "query",
    "text": "query AnnouncementsQuery(\n  $id: ID!\n  $count: Int!\n  $cursor: String\n) {\n  classroomById(id: $id) {\n    ...CreateAnnouncement_classroom\n    ...AnnouncementsList_classroom_1G22uz\n    id\n  }\n  me {\n    isClassroomTeacher(classroomId: $id)\n    ...AnnouncementsList_user_v62IT\n    id\n  }\n}\n\nfragment Announcement_classroomAnnouncement on ClassroomAnnouncement {\n  id\n  content\n  createdAt\n  updatedAt\n  createdBy {\n    name\n    avatarUrl\n    profileColor\n    id\n  }\n}\n\nfragment Announcement_user_v62IT on User {\n  isClassroomTeacher(classroomId: $id)\n}\n\nfragment AnnouncementsList_classroom_1G22uz on Classroom {\n  announcements(first: $count, after: $cursor, order: {createdAt: DESC}) {\n    edges {\n      node {\n        ...Announcement_classroomAnnouncement\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n  id\n}\n\nfragment AnnouncementsList_user_v62IT on User {\n  ...Announcement_user_v62IT\n}\n\nfragment CreateAnnouncement_classroom on Classroom {\n  id\n}\n"
  }
};
})();

(node as any).hash = "1c281bf40b51cb832a6e89b221b0e2a9";

export default node;
