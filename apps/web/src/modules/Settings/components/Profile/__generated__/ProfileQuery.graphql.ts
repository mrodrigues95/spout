/**
 * @generated SignedSource<<68d37089776f29aa622ade817be0dcf2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserProfileColor = "SKY" | "PINK" | "GREEN" | "PURPLE" | "ROSE" | "GRAY" | "ORANGE" | "%future added value";
export type ProfileQuery$variables = {};
export type ProfileQueryVariables = ProfileQuery$variables;
export type ProfileQuery$data = {
  readonly me: {
    readonly name: string;
    readonly bio: string | null;
    readonly avatarUrl: string | null;
    readonly profileColor: UserProfileColor;
    readonly " $fragmentSpreads": FragmentRefs<"ProfilePhoto_user">;
  } | null;
};
export type ProfileQueryResponse = ProfileQuery$data;
export type ProfileQuery = {
  variables: ProfileQueryVariables;
  response: ProfileQuery$data;
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
  "name": "bio",
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
    "name": "ProfileQuery",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "ProfilePhoto_user"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ProfileQuery",
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
    "cacheID": "35ed2b81fcb2b970eb9fee411bf578fd",
    "id": null,
    "metadata": {},
    "name": "ProfileQuery",
    "operationKind": "query",
    "text": "query ProfileQuery {\n  me {\n    name\n    bio\n    avatarUrl\n    profileColor\n    ...ProfilePhoto_user\n    id\n  }\n}\n\nfragment ProfilePhoto_user on User {\n  name\n  avatarUrl\n  profileColor\n}\n"
  }
};
})();

(node as any).hash = "9e659ca54afa3616a48e7785603a90e2";

export default node;
