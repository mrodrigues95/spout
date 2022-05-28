/**
 * @generated SignedSource<<2f96c1907f5418b944044e6d60a61356>>
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
    readonly " $fragmentSpreads": FragmentRefs<"Header_classroom" | "Syllabus_classroom">;
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
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "File",
                "kind": "LinkedField",
                "name": "attachments",
                "plural": true,
                "selections": [
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "location",
                    "storageKey": null
                  },
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "contentLength",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "createdBy",
            "plural": false,
            "selections": [
              (v4/*: any*/),
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
              (v3/*: any*/)
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
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "31834e79bf24e5c952010d304fd8f882",
    "id": null,
    "metadata": {},
    "name": "OverviewQuery",
    "operationKind": "query",
    "text": "query OverviewQuery(\n  $id: ID!\n) {\n  classroomById(id: $id) {\n    syllabus {\n      content\n    }\n    ...Header_classroom\n    ...Syllabus_classroom\n    id\n  }\n}\n\nfragment Header_classroom on Classroom {\n  name\n  createdBy {\n    name\n    avatarUrl\n    profileColor\n    id\n  }\n  discussions {\n    totalCount\n  }\n  users {\n    totalCount\n  }\n}\n\nfragment SyllabusAttachment_file on File {\n  id\n  location\n  name\n  contentLength\n}\n\nfragment SyllabusAttachments_classroomSyllabus on ClassroomSyllabus {\n  attachments {\n    id\n    ...SyllabusAttachment_file\n  }\n}\n\nfragment SyllabusUploadAttachments_classroom on Classroom {\n  id\n  syllabus {\n    content\n  }\n}\n\nfragment Syllabus_classroom on Classroom {\n  id\n  name\n  syllabus {\n    content\n    updatedAt\n    ...SyllabusAttachments_classroomSyllabus\n  }\n  createdBy {\n    name\n    avatarUrl\n    profileColor\n    id\n  }\n  ...SyllabusUploadAttachments_classroom\n}\n"
  }
};
})();

(node as any).hash = "20be90eb0b3a95e9685620fb339a6b30";

export default node;
