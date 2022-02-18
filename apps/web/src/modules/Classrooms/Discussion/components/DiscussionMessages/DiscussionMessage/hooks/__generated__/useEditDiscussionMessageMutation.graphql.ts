/**
 * @generated SignedSource<<bbd3f97d3d71805a15f69c0408a1570c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateDiscussionMessageInput = {
  messageId: string;
  content: string;
};
export type useEditDiscussionMessageMutation$variables = {
  input: UpdateDiscussionMessageInput;
};
export type useEditDiscussionMessageMutationVariables = useEditDiscussionMessageMutation$variables;
export type useEditDiscussionMessageMutation$data = {
  readonly updateDiscussionMessage: {
    readonly message: {
      readonly id: string;
      readonly content: string;
    } | null;
  };
};
export type useEditDiscussionMessageMutationResponse = useEditDiscussionMessageMutation$data;
export type useEditDiscussionMessageMutation = {
  variables: useEditDiscussionMessageMutationVariables;
  response: useEditDiscussionMessageMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UpdateDiscussionMessagePayload",
    "kind": "LinkedField",
    "name": "updateDiscussionMessage",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Message",
        "kind": "LinkedField",
        "name": "message",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "content",
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
    "name": "useEditDiscussionMessageMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useEditDiscussionMessageMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "25f726f68bfa16e96c811952fa4c8360",
    "id": null,
    "metadata": {},
    "name": "useEditDiscussionMessageMutation",
    "operationKind": "mutation",
    "text": "mutation useEditDiscussionMessageMutation(\n  $input: UpdateDiscussionMessageInput!\n) {\n  updateDiscussionMessage(input: $input) {\n    message {\n      id\n      content\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "63d762db037e9b2e852c27535d89b207";

export default node;
