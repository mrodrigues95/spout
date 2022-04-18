/**
 * @generated SignedSource<<2bfeb2089d0f76981a693d740aedcf0f>>
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
  };
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 50
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
          (v3/*: any*/),
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
            "storageKey": "discussions(first:50)"
          },
          {
            "alias": null,
            "args": (v4/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "DiscussionsMenu_classroom_discussions",
            "kind": "LinkedHandle",
            "name": "discussions"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f7f7c112134b9b5289ee870339d7ca20",
    "id": null,
    "metadata": {},
    "name": "ViewClassroomQuery",
    "operationKind": "query",
    "text": "query ViewClassroomQuery(\n  $id: ID!\n) {\n  classroomById(id: $id) {\n    name\n    ...ClassroomHeader_classroom\n    ...DiscussionsMenu_discussions\n    id\n  }\n}\n\nfragment ClassroomHeader_classroom on Classroom {\n  name\n}\n\nfragment DiscussionsMenu_discussions on Classroom {\n  id\n  discussions(first: 50) {\n    edges {\n      node {\n        id\n        name\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d24701926eb9a69e863214cb4904d764";

export default node;
