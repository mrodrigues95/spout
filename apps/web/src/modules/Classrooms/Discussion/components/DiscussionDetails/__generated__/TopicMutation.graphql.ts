/**
 * @generated SignedSource<<7218e97d18c85d72c14fcb955c79dee0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateDiscussionTopicInput = {
  discussionId: string;
  topic: string;
};
export type TopicMutation$variables = {
  input: UpdateDiscussionTopicInput;
};
export type TopicMutationVariables = TopicMutation$variables;
export type TopicMutation$data = {
  readonly updateDiscussionTopic: {
    readonly discussion: {
      readonly id: string;
      readonly topic: string | null;
    } | null;
  };
};
export type TopicMutationResponse = TopicMutation$data;
export type TopicMutation = {
  variables: TopicMutationVariables;
  response: TopicMutation$data;
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
    "concreteType": "UpdateDiscussionTopicPayload",
    "kind": "LinkedField",
    "name": "updateDiscussionTopic",
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
            "name": "topic",
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
    "name": "TopicMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TopicMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8796e1432dd234cb5a0a42f36508c3ca",
    "id": null,
    "metadata": {},
    "name": "TopicMutation",
    "operationKind": "mutation",
    "text": "mutation TopicMutation(\n  $input: UpdateDiscussionTopicInput!\n) {\n  updateDiscussionTopic(input: $input) {\n    discussion {\n      id\n      topic\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "97e0f16e351daf8682a4b5fd49d531b8";

export default node;
