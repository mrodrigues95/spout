/**
 * @generated SignedSource<<b4c018cf7cbdb57dea6844b5f4f47c2c>>
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
  } | null;
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"Syllabus_user">;
  } | null;
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
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = [
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
            "name": "Syllabus_user"
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
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "teacher",
            "plural": false,
            "selections": [
              (v5/*: any*/),
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
            "selections": (v6/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "UsersConnection",
            "kind": "LinkedField",
            "name": "users",
            "plural": false,
            "selections": (v6/*: any*/),
            "storageKey": null
          },
          (v4/*: any*/)
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
    "cacheID": "972df396f808ac85b34f73bb5d76e085",
    "id": null,
    "metadata": {},
    "name": "OverviewQuery",
    "operationKind": "query",
    "text": "query OverviewQuery(\n  $id: ID!\n) {\n  classroomById(id: $id) {\n    syllabus {\n      content\n    }\n    ...Header_classroom\n    ...Syllabus_classroom\n    id\n  }\n  me {\n    ...Syllabus_user_v62IT\n    id\n  }\n}\n\nfragment Header_classroom on Classroom {\n  name\n  teacher {\n    name\n    avatarUrl\n    profileColor\n    id\n  }\n  discussions {\n    totalCount\n  }\n  users {\n    totalCount\n  }\n}\n\nfragment SyllabusAttachment_file on File {\n  id\n  location\n  name\n  contentLength\n}\n\nfragment SyllabusAttachments_classroomSyllabus on ClassroomSyllabus {\n  attachments {\n    id\n    ...SyllabusAttachment_file\n  }\n}\n\nfragment SyllabusUploadAttachments_classroom on Classroom {\n  id\n  syllabus {\n    content\n  }\n}\n\nfragment Syllabus_classroom on Classroom {\n  id\n  name\n  syllabus {\n    content\n    updatedAt\n    ...SyllabusAttachments_classroomSyllabus\n  }\n  teacher {\n    name\n    avatarUrl\n    profileColor\n    id\n  }\n  ...SyllabusUploadAttachments_classroom\n}\n\nfragment Syllabus_user_v62IT on User {\n  isClassroomTeacher(classroomId: $id)\n}\n"
  }
};
})();

(node as any).hash = "41ca8ca7c26a282c7ff8a3d075563d73";

export default node;
