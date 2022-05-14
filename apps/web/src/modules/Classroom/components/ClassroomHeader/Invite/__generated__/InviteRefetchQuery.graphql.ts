/**
 * @generated SignedSource<<d5c64cb735631107bb149134ef07ff25>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InviteRefetchQuery$variables = {
  id: string;
};
export type InviteRefetchQueryVariables = InviteRefetchQuery$variables;
export type InviteRefetchQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"Invite_InviteModal_classroom">;
  } | null;
};
export type InviteRefetchQueryResponse = InviteRefetchQuery$data;
export type InviteRefetchQuery = {
  variables: InviteRefetchQueryVariables;
  response: InviteRefetchQuery$data;
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InviteRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Invite_InviteModal_classroom"
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
    "name": "InviteRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
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
            "type": "Classroom",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "00be76b15fb64458651fbae5baf6801a",
    "id": null,
    "metadata": {},
    "name": "InviteRefetchQuery",
    "operationKind": "query",
    "text": "query InviteRefetchQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...Invite_InviteModal_classroom\n    id\n  }\n}\n\nfragment CopyInvite_classroom on ClassroomInvite {\n  code\n  maxUses\n  maxAge\n}\n\nfragment Invite_InviteModal_classroom on Classroom {\n  id\n  name\n  invites {\n    ...CopyInvite_classroom\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "10eabb5e641deb757ef44227d1aa9742";

export default node;
