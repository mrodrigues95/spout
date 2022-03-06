/**
 * @generated SignedSource<<2d7023b2b3d711b4c11c90ac2e7f37d8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserProfileColor = "SKY" | "PINK" | "GREEN" | "PURPLE" | "ROSE" | "GRAY" | "ORANGE" | "%future added value";
export type SettingsProfileQuery$variables = {};
export type SettingsProfileQueryVariables = SettingsProfileQuery$variables;
export type SettingsProfileQuery$data = {
  readonly me: {
    readonly name: string;
    readonly bio: string | null;
    readonly avatarUrl: string | null;
    readonly profileColor: UserProfileColor;
    readonly " $fragmentSpreads": FragmentRefs<"SettingsProfilePhoto_user">;
  } | null;
};
export type SettingsProfileQueryResponse = SettingsProfileQuery$data;
export type SettingsProfileQuery = {
  variables: SettingsProfileQueryVariables;
  response: SettingsProfileQuery$data;
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
    "name": "SettingsProfileQuery",
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
            "name": "SettingsProfilePhoto_user"
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
    "name": "SettingsProfileQuery",
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
    "cacheID": "5c749602b5eaa56a7dcf1d628edeb140",
    "id": null,
    "metadata": {},
    "name": "SettingsProfileQuery",
    "operationKind": "query",
    "text": "query SettingsProfileQuery {\n  me {\n    name\n    bio\n    avatarUrl\n    profileColor\n    ...SettingsProfilePhoto_user\n    id\n  }\n}\n\nfragment SettingsProfilePhoto_user on User {\n  name\n  avatarUrl\n  profileColor\n}\n"
  }
};
})();

(node as any).hash = "621b57963f750f39893dfb93620d3093";

export default node;
