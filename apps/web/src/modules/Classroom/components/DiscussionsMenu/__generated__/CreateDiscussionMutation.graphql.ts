/**
 * @generated SignedSource<<faaa045fedb7c70a75e8f6772b032693>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateDiscussionInput = {
  classroomId: string;
  name: string;
};
export type CreateDiscussionMutation$variables = {
  input: CreateDiscussionInput;
};
export type CreateDiscussionMutationVariables = CreateDiscussionMutation$variables;
export type CreateDiscussionMutation$data = {
  readonly createDiscussion: {
    readonly discussion: {
      readonly id: string;
      readonly name: string;
      readonly classroom: {
        readonly id: string;
      };
    } | null;
  };
};
export type CreateDiscussionMutationResponse = CreateDiscussionMutation$data;
export type CreateDiscussionMutation = {
  variables: CreateDiscussionMutationVariables;
  response: CreateDiscussionMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "CreateDiscussionPayload",
    "kind": "LinkedField",
    "name": "createDiscussion",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Discussion",
        "kind": "LinkedField",
        "name": "discussion",
        "plural": false,
        "selections": [
          (v1/*: any*/),
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
            "concreteType": "Classroom",
            "kind": "LinkedField",
            "name": "classroom",
            "plural": false,
            "selections": [
              (v1/*: any*/)
            ],
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateDiscussionMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateDiscussionMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "a8871c50fc10dd9ae44f90d6aef83536",
    "id": null,
    "metadata": {},
    "name": "CreateDiscussionMutation",
    "operationKind": "mutation",
    "text": "mutation CreateDiscussionMutation(\n  $input: CreateDiscussionInput!\n) {\n  createDiscussion(input: $input) {\n    discussion {\n      id\n      name\n      classroom {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4174279a36dac74aa79a7e04917c8728";

export default node;
