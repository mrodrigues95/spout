/**
 * @generated SignedSource<<4b066196d812d0c8df4027e6434a9c1e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpsertClassroomSyllabusInput = {
  classroomId: string;
  content?: string | null;
};
export type SyllabusMutation$variables = {
  input: UpsertClassroomSyllabusInput;
};
export type SyllabusMutationVariables = SyllabusMutation$variables;
export type SyllabusMutation$data = {
  readonly upsertClassroomSyllabus: {
    readonly classroom: {
      readonly id: string;
      readonly syllabus: {
        readonly content: string;
        readonly updatedAt: string;
      } | null;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
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
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
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
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SyllabusMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SyllabusMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3ace6ee0458bd2198a0f00be1bb4b0cd",
    "id": null,
    "metadata": {},
    "name": "SyllabusMutation",
    "operationKind": "mutation",
    "text": "mutation SyllabusMutation(\n  $input: UpsertClassroomSyllabusInput!\n) {\n  upsertClassroomSyllabus(input: $input) {\n    classroom {\n      id\n      syllabus {\n        content\n        updatedAt\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "65143154d645a352fa359b93add809f4";

export default node;
