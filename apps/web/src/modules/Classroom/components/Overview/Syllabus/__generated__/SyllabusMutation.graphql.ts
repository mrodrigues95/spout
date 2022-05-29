/**
 * @generated SignedSource<<db26095c325e86aad48dacf0128048c6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpsertClassroomSyllabusInput = {
  classroomId: string;
  fileIds: ReadonlyArray<string>;
  content?: string | null;
};
export type SyllabusMutation$variables = {
  input: UpsertClassroomSyllabusInput;
};
export type SyllabusMutationVariables = SyllabusMutation$variables;
export type SyllabusMutation$data = {
  readonly upsertClassroomSyllabus: {
    readonly classroom: {
      readonly " $fragmentSpreads": FragmentRefs<"Syllabus_classroom">;
    } | null;
  };
};
export type SyllabusMutationResponse = SyllabusMutation$data;
export type SyllabusMutation = {
  variables: SyllabusMutationVariables;
  response: SyllabusMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SyllabusMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpsertClassroomSyllabusPayload",
        "kind": "LinkedField",
        "name": "upsertClassroomSyllabus",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Classroom",
            "kind": "LinkedField",
            "name": "classroom",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Syllabus_classroom"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SyllabusMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpsertClassroomSyllabusPayload",
        "kind": "LinkedField",
        "name": "upsertClassroomSyllabus",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Classroom",
            "kind": "LinkedField",
            "name": "classroom",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ClassroomSyllabus",
                "kind": "LinkedField",
                "name": "syllabus",
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
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "location",
                        "storageKey": null
                      },
                      (v3/*: any*/),
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
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "teacher",
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
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "82d191e126c912b2684c0ea1b10a60e0",
    "id": null,
    "metadata": {},
    "name": "SyllabusMutation",
    "operationKind": "mutation",
    "text": "mutation SyllabusMutation(\n  $input: UpsertClassroomSyllabusInput!\n) {\n  upsertClassroomSyllabus(input: $input) {\n    classroom {\n      ...Syllabus_classroom\n      id\n    }\n  }\n}\n\nfragment SyllabusAttachment_file on File {\n  id\n  location\n  name\n  contentLength\n}\n\nfragment SyllabusAttachments_classroomSyllabus on ClassroomSyllabus {\n  attachments {\n    id\n    ...SyllabusAttachment_file\n  }\n}\n\nfragment SyllabusUploadAttachments_classroom on Classroom {\n  id\n  syllabus {\n    content\n  }\n}\n\nfragment Syllabus_classroom on Classroom {\n  id\n  name\n  syllabus {\n    content\n    updatedAt\n    ...SyllabusAttachments_classroomSyllabus\n  }\n  teacher {\n    name\n    avatarUrl\n    profileColor\n    id\n  }\n  ...SyllabusUploadAttachments_classroom\n}\n"
  }
};
})();

(node as any).hash = "9d75b24510bbd275a0accac246758f41";

export default node;
