/**
 * @generated SignedSource<<bba91834c1405854c4b047dd49bcc6d3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewClassroomQuery$variables = {
  id: string;
};
export type ViewClassroomQueryVariables = ViewClassroomQuery$variables;
export type ViewClassroomQuery$data = {
  readonly classroomById: {
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"ClassroomHeader_classroom" | "DiscussionsMenu_discussions">;
  } | null;
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"ClassroomHeader_user" | "DiscussionsMenu_user">;
  } | null;
};
export type ViewClassroomQueryResponse = ViewClassroomQuery$data;
export type ViewClassroomQuery = {
  variables: ViewClassroomQueryVariables;
  response: ViewClassroomQuery$data;
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
  {
    "kind": "Variable",
    "name": "classroomId",
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
v5 = [
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ViewClassroomQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Classroom",
        "kind": "LinkedField",
        "name": "classroomById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ClassroomHeader_classroom"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "DiscussionsMenu_discussions"
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
            "args": (v3/*: any*/),
            "kind": "FragmentSpread",
            "name": "ClassroomHeader_user"
          },
          {
            "args": (v3/*: any*/),
            "kind": "FragmentSpread",
            "name": "DiscussionsMenu_user"
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
    "name": "ViewClassroomQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Classroom",
        "kind": "LinkedField",
        "name": "classroomById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v4/*: any*/),
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
                      (v4/*: any*/),
                      (v2/*: any*/),
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
            "args": (v5/*: any*/),
            "filters": [
              "order"
            ],
            "handle": "connection",
            "key": "DiscussionsMenu_discussions",
            "kind": "LinkedHandle",
            "name": "discussions"
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
            "alias": null,
            "args": (v3/*: any*/),
            "kind": "ScalarField",
            "name": "isClassroomTeacher",
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4ffacfad5950b00a6dbdc3cd521212c2",
    "id": null,
    "metadata": {},
    "name": "ViewClassroomQuery",
    "operationKind": "query",
    "text": "query ViewClassroomQuery(\n  $id: ID!\n) {\n  classroomById(id: $id) {\n    name\n    ...ClassroomHeader_classroom\n    ...DiscussionsMenu_discussions\n    id\n  }\n  me {\n    ...ClassroomHeader_user_v62IT\n    ...DiscussionsMenu_user_v62IT\n    id\n  }\n}\n\nfragment ClassroomHeader_classroom on Classroom {\n  name\n}\n\nfragment ClassroomHeader_user_v62IT on User {\n  isClassroomTeacher(classroomId: $id)\n}\n\nfragment CreateDiscussion_classroom on Classroom {\n  id\n}\n\nfragment DiscussionsMenu_discussions on Classroom {\n  id\n  ...CreateDiscussion_classroom\n  discussions(first: 50, order: {name: ASC}) {\n    edges {\n      node {\n        id\n        name\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment DiscussionsMenu_user_v62IT on User {\n  isClassroomTeacher(classroomId: $id)\n}\n"
  }
};
})();

(node as any).hash = "c8dde514098aef615bd621adc83e12b7";

export default node;
