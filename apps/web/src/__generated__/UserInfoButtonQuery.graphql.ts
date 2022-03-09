/**
 * @generated SignedSource<<f65d8239bde72e03bfacd2e0d4aede04>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type UserProfileColor = "SKY" | "PINK" | "GREEN" | "PURPLE" | "ROSE" | "GRAY" | "ORANGE" | "%future added value";
export type UserInfoButtonQuery$variables = {};
export type UserInfoButtonQueryVariables = UserInfoButtonQuery$variables;
export type UserInfoButtonQuery$data = {
  readonly me: {
    readonly name: string;
    readonly email: string;
    readonly avatarUrl: string | null;
    readonly profileColor: UserProfileColor;
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
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "profileColor",
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
          (v2/*: any*/),
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
          (v3/*: any*/),
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
    "cacheID": "5ce7d312f58144770eedb75e706dfb03",
    "id": null,
    "metadata": {},
    "name": "UserInfoButtonQuery",
    "operationKind": "query",
    "text": "query UserInfoButtonQuery {\n  me {\n    name\n    email\n    avatarUrl\n    profileColor\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "b3e1de5416bd07437c246dc6c5ec2d5f";

export default node;
