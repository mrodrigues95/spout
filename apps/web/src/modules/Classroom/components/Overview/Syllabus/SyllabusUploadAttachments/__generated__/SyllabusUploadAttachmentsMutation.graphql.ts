/**
 * @generated SignedSource<<ccb79c0dfc311daccfb5be80408a8e8d>>
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
export type SyllabusUploadAttachmentsMutation$variables = {
  input: UpsertClassroomSyllabusInput;
};
export type SyllabusUploadAttachmentsMutationVariables = SyllabusUploadAttachmentsMutation$variables;
export type SyllabusUploadAttachmentsMutation$data = {
  readonly upsertClassroomSyllabus: {
    readonly classroom: {
      readonly " $fragmentSpreads": FragmentRefs<"Syllabus_classroom">;
    } | null;
  };
};
export type SyllabusUploadAttachmentsMutationResponse = SyllabusUploadAttachmentsMutation$data;
export type SyllabusUploadAttachmentsMutation = {
  variables: SyllabusUploadAttachmentsMutationVariables;
  response: SyllabusUploadAttachmentsMutation$data;
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
    "name": "SyllabusUploadAttachmentsMutation",
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
    "name": "SyllabusUploadAttachmentsMutation",
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
    "cacheID": "c1cbcd3daf5d34a8987fa05a9215e7f6",
    "id": null,
    "metadata": {},
    "name": "SyllabusUploadAttachmentsMutation",
    "operationKind": "mutation",
    "text": "mutation SyllabusUploadAttachmentsMutation(\n  $input: UpsertClassroomSyllabusInput!\n) {\n  upsertClassroomSyllabus(input: $input) {\n    classroom {\n      ...Syllabus_classroom\n      id\n    }\n  }\n}\n\nfragment SyllabusAttachment_file on File {\n  id\n  location\n  name\n  contentLength\n}\n\nfragment SyllabusAttachments_classroomSyllabus on ClassroomSyllabus {\n  attachments {\n    id\n    ...SyllabusAttachment_file\n  }\n}\n\nfragment SyllabusUploadAttachments_classroom on Classroom {\n  id\n  syllabus {\n    content\n  }\n}\n\nfragment Syllabus_classroom on Classroom {\n  id\n  name\n  syllabus {\n    content\n    updatedAt\n    ...SyllabusAttachments_classroomSyllabus\n  }\n  teacher {\n    name\n    avatarUrl\n    profileColor\n    id\n  }\n  ...SyllabusUploadAttachments_classroom\n}\n"
  }
};
})();

(node as any).hash = "b66b6910fa7a20847054c317974dc38a";

export default node;
