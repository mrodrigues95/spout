/**
 * @generated SignedSource<<4395006edf26c86ce516620653d7c672>>
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
export type SyllabusAttachmentsMutation$variables = {
  input: UpsertClassroomSyllabusInput;
};
export type SyllabusAttachmentsMutationVariables = SyllabusAttachmentsMutation$variables;
export type SyllabusAttachmentsMutation$data = {
  readonly upsertClassroomSyllabus: {
    readonly classroom: {
      readonly " $fragmentSpreads": FragmentRefs<"Syllabus_classroom">;
    } | null;
  };
};
export type SyllabusAttachmentsMutationResponse = SyllabusAttachmentsMutation$data;
export type SyllabusAttachmentsMutation = {
  variables: SyllabusAttachmentsMutationVariables;
  response: SyllabusAttachmentsMutation$data;
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
    "name": "SyllabusAttachmentsMutation",
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
    "name": "SyllabusAttachmentsMutation",
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
    "cacheID": "56b645a1689dcc0f56afae1ed97f7c6e",
    "id": null,
    "metadata": {},
    "name": "SyllabusAttachmentsMutation",
    "operationKind": "mutation",
    "text": "mutation SyllabusAttachmentsMutation(\n  $input: UpsertClassroomSyllabusInput!\n) {\n  upsertClassroomSyllabus(input: $input) {\n    classroom {\n      ...Syllabus_classroom\n      id\n    }\n  }\n}\n\nfragment SyllabusAttachments_classroom on Classroom {\n  id\n  syllabus {\n    content\n  }\n}\n\nfragment Syllabus_classroom on Classroom {\n  id\n  name\n  syllabus {\n    content\n    updatedAt\n    attachments {\n      id\n      location\n      name\n      contentLength\n    }\n  }\n  createdBy {\n    name\n    avatarUrl\n    profileColor\n    id\n  }\n  ...SyllabusAttachments_classroom\n}\n"
  }
};
})();

(node as any).hash = "751b13265cd7b1527e4dfa490affcf46";

export default node;
