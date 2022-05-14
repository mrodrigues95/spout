/**
 * @generated SignedSource<<8c8e20e2f61b0e58363f46ded0386d42>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateClassroomInput = {
  name: string;
};
export type CreateOrJoinClassroomCreateMutation$variables = {
  input: CreateClassroomInput;
};
export type CreateOrJoinClassroomCreateMutationVariables = CreateOrJoinClassroomCreateMutation$variables;
export type CreateOrJoinClassroomCreateMutation$data = {
  readonly createClassroom: {
    readonly classroom: {
      readonly id: string;
      readonly name: string;
      readonly createdBy: {
        readonly id: string;
      };
    } | null;
  };
};
export type CreateOrJoinClassroomCreateMutationResponse = CreateOrJoinClassroomCreateMutation$data;
export type CreateOrJoinClassroomCreateMutation = {
  variables: CreateOrJoinClassroomCreateMutationVariables;
  response: CreateOrJoinClassroomCreateMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "CreateClassroomPayload",
    "kind": "LinkedField",
    "name": "createClassroom",
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
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
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
              (v1/*: any*/)
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
    "name": "CreateOrJoinClassroomCreateMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateOrJoinClassroomCreateMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "89dbb3dfbeb4b7c4dbf6ad76bf44a8f0",
    "id": null,
    "metadata": {},
    "name": "CreateOrJoinClassroomCreateMutation",
    "operationKind": "mutation",
    "text": "mutation CreateOrJoinClassroomCreateMutation(\n  $input: CreateClassroomInput!\n) {\n  createClassroom(input: $input) {\n    classroom {\n      id\n      name\n      createdBy {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "82131cf1c046322afced96cb64c6b16b";

export default node;
