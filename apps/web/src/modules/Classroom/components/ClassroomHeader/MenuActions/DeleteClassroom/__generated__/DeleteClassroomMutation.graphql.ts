/**
 * @generated SignedSource<<21e4934cb7e50c56f6003ca05fd0d897>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteClassroomInput = {
  classroomId: string;
};
export type DeleteClassroomMutation$variables = {
  input: DeleteClassroomInput;
};
export type DeleteClassroomMutationVariables = DeleteClassroomMutation$variables;
export type DeleteClassroomMutation$data = {
  readonly deleteClassroom: {
    readonly classroom: {
      readonly id: string;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly message?: string;
    }> | null;
  };
};
export type DeleteClassroomMutationResponse = DeleteClassroomMutation$data;
export type DeleteClassroomMutation = {
  variables: DeleteClassroomMutationVariables;
  response: DeleteClassroomMutation$data;
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
    }
  ],
  "storageKey": null
},
v3 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "message",
      "storageKey": null
    }
  ],
  "type": "Error",
  "abstractKey": "__isError"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "DeleteClassroomMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteClassroomPayload",
        "kind": "LinkedField",
        "name": "deleteClassroom",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              (v3/*: any*/)
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
    "name": "DeleteClassroomMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteClassroomPayload",
        "kind": "LinkedField",
        "name": "deleteClassroom",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "557301f42eaf56f23ada0aaa47e924be",
    "id": null,
    "metadata": {},
    "name": "DeleteClassroomMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteClassroomMutation(\n  $input: DeleteClassroomInput!\n) {\n  deleteClassroom(input: $input) {\n    classroom {\n      id\n    }\n    errors {\n      __typename\n      ... on Error {\n        __isError: __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c3650dffd1a1380fbf992423b2ead618";

export default node;
