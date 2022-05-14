/**
 * @generated SignedSource<<5299a026a47bc1552ea541d07961445d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InviteQuery$variables = {
  id: string;
};
export type InviteQueryVariables = InviteQuery$variables;
export type InviteQuery$data = {
  readonly classroomById: {
    readonly id: string;
    readonly name: string;
    readonly invites: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"CopyInvite_classroom">;
    }>;
  };
};
export type InviteQueryResponse = InviteQuery$data;
export type InviteQuery = {
  variables: InviteQueryVariables;
  response: InviteQuery$data;
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
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InviteQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Classroom",
        "kind": "LinkedField",
        "name": "classroomById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ClassroomInvite",
            "kind": "LinkedField",
            "name": "invites",
            "plural": true,
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
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "InviteQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Classroom",
        "kind": "LinkedField",
        "name": "classroomById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ClassroomInvite",
            "kind": "LinkedField",
            "name": "invites",
            "plural": true,
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
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "bb8db4e44512b15ea8af8ec4fe254dba",
    "id": null,
    "metadata": {},
    "name": "InviteQuery",
    "operationKind": "query",
    "text": "query InviteQuery(\n  $id: ID!\n) {\n  classroomById(id: $id) {\n    id\n    name\n    invites {\n      ...CopyInvite_classroom\n      id\n    }\n  }\n}\n\nfragment CopyInvite_classroom on ClassroomInvite {\n  code\n  maxUses\n  maxAge\n}\n"
  }
};
})();

(node as any).hash = "c04d0554d4aa591affad3d8a82b83deb";

export default node;
