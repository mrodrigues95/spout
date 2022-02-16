/**
 * @generated SignedSource<<7867ba5a57a12b481228f691f46eabf6>>
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
export type EditDiscussionMessageMutation$variables = {
  input: UpdateDiscussionMessageInput;
};
export type EditDiscussionMessageMutationVariables = EditDiscussionMessageMutation$variables;
export type EditDiscussionMessageMutation$data = {
  readonly updateDiscussionMessage: {
    readonly message: {
      readonly id: string;
      readonly content: string;
    } | null;
  };
};
export type EditDiscussionMessageMutationResponse = EditDiscussionMessageMutation$data;
export type EditDiscussionMessageMutation = {
  variables: EditDiscussionMessageMutationVariables;
  response: EditDiscussionMessageMutation$data;
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
    "name": "EditDiscussionMessageMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditDiscussionMessageMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "396e2a7d4fdf2987ec825d9cb3532b7a",
    "id": null,
    "metadata": {},
    "name": "EditDiscussionMessageMutation",
    "operationKind": "mutation",
    "text": "mutation EditDiscussionMessageMutation(\n  $input: UpdateDiscussionMessageInput!\n) {\n  updateDiscussionMessage(input: $input) {\n    message {\n      id\n      content\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d1fb9b5efaf75b933cd051d77706d64b";

export default node;
