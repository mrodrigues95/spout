/**
 * @generated SignedSource<<9c86eca10b7be40ac729b1ab5d714681>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OverviewQuery$variables = {
  id: string;
};
export type OverviewQueryVariables = OverviewQuery$variables;
export type OverviewQuery$data = {
  readonly classroomById: {
    readonly syllabus: {
      readonly content: string;
    } | null;
    readonly " $fragmentSpreads": FragmentRefs<"Header_classroom" | "Syllabus_classroom" | "SyllabusAttachments_classroom">;
  };
};
export type OverviewQueryResponse = OverviewQuery$data;
export type OverviewQuery = {
  variables: OverviewQueryVariables;
  response: OverviewQuery$data;
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
  "name": "content",
  "storageKey": null
},
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
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "totalCount",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "OverviewQuery",
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
            "args": null,
            "concreteType": "ClassroomSyllabus",
            "kind": "LinkedField",
            "name": "syllabus",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Header_classroom"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Syllabus_classroom"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SyllabusAttachments_classroom"
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
    "name": "OverviewQuery",
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
            "args": null,
            "concreteType": "ClassroomSyllabus",
            "kind": "LinkedField",
            "name": "syllabus",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "updatedAt",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "createdBy",
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
            "concreteType": "DiscussionsConnection",
            "kind": "LinkedField",
            "name": "discussions",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "UsersConnection",
            "kind": "LinkedField",
            "name": "users",
            "plural": false,
            "selections": (v5/*: any*/),
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "fb7fe1f48b20d00e05ac5a7818c8dceb",
    "id": null,
    "metadata": {},
    "name": "OverviewQuery",
    "operationKind": "query",
    "text": "query OverviewQuery(\n  $id: ID!\n) {\n  classroomById(id: $id) {\n    syllabus {\n      content\n    }\n    ...Header_classroom\n    ...Syllabus_classroom\n    ...SyllabusAttachments_classroom\n    id\n  }\n}\n\nfragment Header_classroom on Classroom {\n  name\n  createdBy {\n    name\n    avatarUrl\n    profileColor\n    id\n  }\n  discussions {\n    totalCount\n  }\n  users {\n    totalCount\n  }\n}\n\nfragment SyllabusAttachments_classroom on Classroom {\n  syllabus {\n    content\n  }\n}\n\nfragment Syllabus_classroom on Classroom {\n  id\n  name\n  syllabus {\n    content\n    updatedAt\n  }\n  createdBy {\n    name\n    avatarUrl\n    profileColor\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "1125266756729880e63c6cf40c90b32a";

export default node;
