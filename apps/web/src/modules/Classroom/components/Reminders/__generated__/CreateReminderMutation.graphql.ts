/**
 * @generated SignedSource<<f6c026015a6fca86140dcc9a176398b0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClassroomReminderImportance = "LOW" | "MEDIUM" | "HIGH" | "%future added value";
export type CreateClassroomReminderInput = {
  classroomId: string;
  title: string;
  description?: string | null;
  dueAt: string;
  importance: ClassroomReminderImportance;
};
export type CreateReminderMutation$variables = {
  input: CreateClassroomReminderInput;
};
export type CreateReminderMutationVariables = CreateReminderMutation$variables;
export type CreateReminderMutation$data = {
  readonly createClassroomReminder: {
    readonly classroomReminder: {
      readonly " $fragmentSpreads": FragmentRefs<"Reminder_classroomReminder">;
    } | null;
  };
};
export type CreateReminderMutationResponse = CreateReminderMutation$data;
export type CreateReminderMutation = {
  variables: CreateReminderMutationVariables;
  response: CreateReminderMutation$data;
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateReminderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateClassroomReminderPayload",
        "kind": "LinkedField",
        "name": "createClassroomReminder",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ClassroomReminder",
            "kind": "LinkedField",
            "name": "classroomReminder",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Reminder_classroomReminder"
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
    "name": "CreateReminderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateClassroomReminderPayload",
        "kind": "LinkedField",
        "name": "createClassroomReminder",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ClassroomReminder",
            "kind": "LinkedField",
            "name": "classroomReminder",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "importance",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "dueAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
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
    "cacheID": "93ebc78a5a9830ebba7a89ce469bc93b",
    "id": null,
    "metadata": {},
    "name": "CreateReminderMutation",
    "operationKind": "mutation",
    "text": "mutation CreateReminderMutation(\n  $input: CreateClassroomReminderInput!\n) {\n  createClassroomReminder(input: $input) {\n    classroomReminder {\n      ...Reminder_classroomReminder\n      id\n    }\n  }\n}\n\nfragment Reminder_classroomReminder on ClassroomReminder {\n  title\n  description\n  importance\n  dueAt\n}\n"
  }
};
})();

(node as any).hash = "c01e64d13bd3d67ff67b46cac62e4398";

export default node;
