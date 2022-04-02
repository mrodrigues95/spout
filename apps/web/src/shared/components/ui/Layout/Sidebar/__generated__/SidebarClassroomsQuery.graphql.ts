/**
 * @generated SignedSource<<c23909262eeb322e342a22c2ad85f988>>
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
    readonly id: string;
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
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "me",
    "plural": false,
    "selections": [
      (v0/*: any*/),
      {
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
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SidebarClassroomsQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SidebarClassroomsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "0190993aa4556d33267b86d4765cbb39",
    "id": null,
    "metadata": {},
    "name": "SidebarClassroomsQuery",
    "operationKind": "query",
    "text": "query SidebarClassroomsQuery {\n  me {\n    id\n    classrooms {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e7796060aa87098b88b20944b484b509";

export default node;
