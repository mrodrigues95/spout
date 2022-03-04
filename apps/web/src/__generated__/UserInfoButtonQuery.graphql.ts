/**
 * @generated SignedSource<<917f5af448323195f810e120fe729443>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type UserInfoButtonQuery$variables = {};
export type UserInfoButtonQueryVariables = UserInfoButtonQuery$variables;
export type UserInfoButtonQuery$data = {
  readonly me: {
    readonly name: string;
    readonly email: string;
    readonly avatarUrl: string | null;
  } | null;
};
export type UserInfoButtonQueryResponse = UserInfoButtonQuery$data;
export type UserInfoButtonQuery = {
  variables: UserInfoButtonQueryVariables;
  response: UserInfoButtonQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "avatarUrl",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserInfoButtonQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UserInfoButtonQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          (v2/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "42769f5719129932f8f79aea10bc2e46",
    "id": null,
    "metadata": {},
    "name": "UserInfoButtonQuery",
    "operationKind": "query",
    "text": "query UserInfoButtonQuery {\n  me {\n    name\n    email\n    avatarUrl\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "10b6289172bf05beb1644df52070bf5d";

export default node;
