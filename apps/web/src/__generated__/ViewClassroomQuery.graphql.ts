/**
 * @generated SignedSource<<c1192a28a15126adbf6d9925368bd03b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewClassroomQuery$variables = {
  id: string;
};
export type ViewClassroomQueryVariables = ViewClassroomQuery$variables;
export type ViewClassroomQuery$data = {
  readonly classroomById: {
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"DiscussionsNavigation_discussions">;
  };
};
export type ViewClassroomQueryResponse = ViewClassroomQuery$data;
export type ViewClassroomQuery = {
  variables: ViewClassroomQueryVariables;
  response: ViewClassroomQuery$data;
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
  "name": "name",
  "storageKey": null
},
v3 = {
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
    "name": "ViewClassroomQuery",
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
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "DiscussionsNavigation_discussions"
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
    "name": "ViewClassroomQuery",
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
            "concreteType": "Discussion",
            "kind": "LinkedField",
            "name": "discussions",
            "plural": true,
            "selections": [
              (v3/*: any*/),
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
    "cacheID": "70403e8fdbebf3f28f184b462e98617c",
    "id": null,
    "metadata": {},
    "name": "ViewClassroomQuery",
    "operationKind": "query",
    "text": "query ViewClassroomQuery(\n  $id: ID!\n) {\n  classroomById(id: $id) {\n    name\n    ...DiscussionsNavigation_discussions\n    id\n  }\n}\n\nfragment DiscussionsNavigation_discussions on Classroom {\n  id\n  discussions {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "1dd236e6313420fd3b1cba39f7a039c1";

export default node;
