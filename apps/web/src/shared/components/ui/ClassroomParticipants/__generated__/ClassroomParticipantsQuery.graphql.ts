/**
 * @generated SignedSource<<2e0e9c149362e60c1418037c2966d9d8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type UserProfileColor = "SKY" | "PINK" | "GREEN" | "PURPLE" | "ROSE" | "GRAY" | "ORANGE" | "%future added value";
export type ClassroomParticipantsQuery$variables = {
  id: string;
};
export type ClassroomParticipantsQueryVariables = ClassroomParticipantsQuery$variables;
export type ClassroomParticipantsQuery$data = {
  readonly classroomById: {
    readonly users: ReadonlyArray<{
      readonly id: string;
      readonly avatarUrl: string | null;
      readonly name: string;
      readonly profileColor: UserProfileColor;
    }>;
  };
};
export type ClassroomParticipantsQueryResponse = ClassroomParticipantsQuery$data;
export type ClassroomParticipantsQuery = {
  variables: ClassroomParticipantsQueryVariables;
  response: ClassroomParticipantsQuery$data;
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
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "users",
  "plural": true,
  "selections": [
    (v2/*: any*/),
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
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "profileColor",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ClassroomParticipantsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Classroom",
        "kind": "LinkedField",
        "name": "classroomById",
        "plural": false,
        "selections": [
          (v3/*: any*/)
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
    "name": "ClassroomParticipantsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Classroom",
        "kind": "LinkedField",
        "name": "classroomById",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9eb25682393f79f1b8c9dd529c1894a9",
    "id": null,
    "metadata": {},
    "name": "ClassroomParticipantsQuery",
    "operationKind": "query",
    "text": "query ClassroomParticipantsQuery(\n  $id: ID!\n) {\n  classroomById(id: $id) {\n    users {\n      id\n      avatarUrl\n      name\n      profileColor\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "3f8a62615a12c8d919edf4db32fc92a5";

export default node;
