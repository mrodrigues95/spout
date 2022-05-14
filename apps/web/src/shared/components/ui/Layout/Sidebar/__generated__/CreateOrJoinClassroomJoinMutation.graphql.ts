/**
 * @generated SignedSource<<829b2aead7e5b53470b86920dc0ee0af>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type JoinClassroomInput = {
  code: string;
};
export type CreateOrJoinClassroomJoinMutation$variables = {
  input: JoinClassroomInput;
};
export type CreateOrJoinClassroomJoinMutationVariables = CreateOrJoinClassroomJoinMutation$variables;
export type CreateOrJoinClassroomJoinMutation$data = {
  readonly joinClassroom: {
    readonly classroom: {
      readonly id: string;
      readonly name: string;
      readonly createdBy: {
        readonly id: string;
      };
    } | null;
    readonly errors: ReadonlyArray<{
      readonly __typename?: string;
      readonly message?: string;
    }> | null;
  };
};
export type CreateOrJoinClassroomJoinMutationResponse = CreateOrJoinClassroomJoinMutation$data;
export type CreateOrJoinClassroomJoinMutation = {
  variables: CreateOrJoinClassroomJoinMutationVariables;
  response: CreateOrJoinClassroomJoinMutation$data;
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
  "concreteType": "Classroom",
  "kind": "LinkedField",
  "name": "classroom",
  "plural": false,
  "selections": [
    (v2/*: any*/),
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
        (v2/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateOrJoinClassroomJoinMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "JoinClassroomPayload",
        "kind": "LinkedField",
        "name": "joinClassroom",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/)
                ],
                "type": "Error",
                "abstractKey": "__isError"
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
    "name": "CreateOrJoinClassroomJoinMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "JoinClassroomPayload",
        "kind": "LinkedField",
        "name": "joinClassroom",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              (v4/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v5/*: any*/)
                ],
                "type": "Error",
                "abstractKey": "__isError"
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
    "cacheID": "6598b890697b1fa6432766f3462303d6",
    "id": null,
    "metadata": {},
    "name": "CreateOrJoinClassroomJoinMutation",
    "operationKind": "mutation",
    "text": "mutation CreateOrJoinClassroomJoinMutation(\n  $input: JoinClassroomInput!\n) {\n  joinClassroom(input: $input) {\n    classroom {\n      id\n      name\n      createdBy {\n        id\n      }\n    }\n    errors {\n      __typename\n      ... on Error {\n        __isError: __typename\n        __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f42d71573559e18892d0f3160328d330";

export default node;
