/**
 * @generated SignedSource<<b8d9b5efff3334542d7aaafdaa1860d1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateClassroomInviteInput = {
  classroomId: string;
  code?: string | null;
  maxAge?: number | null;
  maxUses?: any | null;
};
export type InviteMutation$variables = {
  input: CreateClassroomInviteInput;
};
export type InviteMutationVariables = InviteMutation$variables;
export type InviteMutation$data = {
  readonly createClassroomInvite: {
    readonly invite: {
      readonly id: number;
      readonly code: string;
      readonly uses: any;
      readonly maxUses: any | null;
      readonly maxAge: number | null;
      readonly expiresAt: string | null;
      readonly createdAt: string;
    } | null;
  };
};
export type InviteMutationResponse = InviteMutation$data;
export type InviteMutation = {
  variables: InviteMutationVariables;
  response: InviteMutation$data;
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
    "concreteType": "CreateClassroomInvitePayload",
    "kind": "LinkedField",
    "name": "createClassroomInvite",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Invite",
        "kind": "LinkedField",
        "name": "invite",
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
            "kind": "ScalarField",
            "name": "code",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "uses",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "maxUses",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "maxAge",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "expiresAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "createdAt",
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
    "name": "InviteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "InviteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e06595d4c65fb6dd991b78fe8a5e59c7",
    "id": null,
    "metadata": {},
    "name": "InviteMutation",
    "operationKind": "mutation",
    "text": "mutation InviteMutation(\n  $input: CreateClassroomInviteInput!\n) {\n  createClassroomInvite(input: $input) {\n    invite {\n      id\n      code\n      uses\n      maxUses\n      maxAge\n      expiresAt\n      createdAt\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "bdfce66fedacca8a5e4f1ebc5941df01";

export default node;
