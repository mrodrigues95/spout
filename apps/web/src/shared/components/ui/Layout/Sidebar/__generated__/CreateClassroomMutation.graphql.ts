/**
 * @generated SignedSource<<4ab38cf73bb7e96b33ecf0cef8faf228>>
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
export type CreateClassroomMutation$variables = {
  input: CreateClassroomInput;
};
export type CreateClassroomMutationVariables = CreateClassroomMutation$variables;
export type CreateClassroomMutation$data = {
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
export type CreateClassroomMutationResponse = CreateClassroomMutation$data;
export type CreateClassroomMutation = {
  variables: CreateClassroomMutationVariables;
  response: CreateClassroomMutation$data;
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
    "name": "CreateClassroomMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateClassroomMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "3da14f79b6e4bfa5a0195edd987dfdf2",
    "id": null,
    "metadata": {},
    "name": "CreateClassroomMutation",
    "operationKind": "mutation",
    "text": "mutation CreateClassroomMutation(\n  $input: CreateClassroomInput!\n) {\n  createClassroom(input: $input) {\n    classroom {\n      id\n      name\n      createdBy {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5656cb6ef5cb44a053e3b34b527e178f";

export default node;
