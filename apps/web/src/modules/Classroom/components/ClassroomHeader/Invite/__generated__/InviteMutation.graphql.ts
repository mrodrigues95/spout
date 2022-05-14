/**
 * @generated SignedSource<<451c1bb7245c325d289904bd66d03384>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateClassroomInviteInput = {
  classroomId: string;
  maxAge?: number | null;
  maxUses?: number | null;
};
export type InviteMutation$variables = {
  input: CreateClassroomInviteInput;
};
export type InviteMutationVariables = InviteMutation$variables;
export type InviteMutation$data = {
  readonly createClassroomInvite: {
    readonly classroomInvite: {
      readonly " $fragmentSpreads": FragmentRefs<"CopyInvite_classroom">;
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
    "name": "InviteMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateClassroomInvitePayload",
        "kind": "LinkedField",
        "name": "createClassroomInvite",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ClassroomInvite",
            "kind": "LinkedField",
            "name": "classroomInvite",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "CopyInvite_classroom"
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
    "name": "InviteMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateClassroomInvitePayload",
        "kind": "LinkedField",
        "name": "createClassroomInvite",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ClassroomInvite",
            "kind": "LinkedField",
            "name": "classroomInvite",
            "plural": false,
            "selections": [
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
    "cacheID": "fc8f534fee0c7bd7c047a7ad05799e33",
    "id": null,
    "metadata": {},
    "name": "InviteMutation",
    "operationKind": "mutation",
    "text": "mutation InviteMutation(\n  $input: CreateClassroomInviteInput!\n) {\n  createClassroomInvite(input: $input) {\n    classroomInvite {\n      ...CopyInvite_classroom\n      id\n    }\n  }\n}\n\nfragment CopyInvite_classroom on ClassroomInvite {\n  code\n  maxUses\n  maxAge\n}\n"
  }
};
})();

(node as any).hash = "86a5592f1de9c298af71ef274a24ed18";

export default node;
