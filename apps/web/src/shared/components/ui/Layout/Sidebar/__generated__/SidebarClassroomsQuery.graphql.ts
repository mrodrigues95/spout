/**
 * @generated SignedSource<<a914473fa605945b3eb3c3099c2e36d9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type SidebarClassroomsQuery$variables = {};
export type SidebarClassroomsQueryVariables = SidebarClassroomsQuery$variables;
export type SidebarClassroomsQuery$data = {
  readonly me: {
    readonly classrooms: ReadonlyArray<{
      readonly id: string;
      readonly name: string;
    }>;
  } | null;
};
export type SidebarClassroomsQueryResponse = SidebarClassroomsQuery$data;
export type SidebarClassroomsQuery = {
  variables: SidebarClassroomsQueryVariables;
  response: SidebarClassroomsQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "concreteType": "Classroom",
  "kind": "LinkedField",
  "name": "classrooms",
  "plural": true,
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SidebarClassroomsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v1/*: any*/)
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
    "name": "SidebarClassroomsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4bf2058a0a8e979fa82e57f6f952fedd",
    "id": null,
    "metadata": {},
    "name": "SidebarClassroomsQuery",
    "operationKind": "query",
    "text": "query SidebarClassroomsQuery {\n  me {\n    classrooms {\n      id\n      name\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "8c03bb62c530a22c3cdeef87a57f2a3e";

export default node;
