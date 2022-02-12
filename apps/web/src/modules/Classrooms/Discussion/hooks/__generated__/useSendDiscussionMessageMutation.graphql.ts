/**
 * @generated SignedSource<<813b21570c26994491731a661e2c47e7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SendDiscussionMessageInput = {
  discussionId: string;
  fileIds: ReadonlyArray<string>;
  content: string;
};
export type useSendDiscussionMessageMutation$variables = {
  input: SendDiscussionMessageInput;
};
export type useSendDiscussionMessageMutationVariables = useSendDiscussionMessageMutation$variables;
export type useSendDiscussionMessageMutation$data = {
  readonly sendDiscussionMessage: {
    readonly message: {
      readonly id: string;
    } | null;
  };
};
export type useSendDiscussionMessageMutationResponse = useSendDiscussionMessageMutation$data;
export type useSendDiscussionMessageMutation = {
  variables: useSendDiscussionMessageMutationVariables;
  response: useSendDiscussionMessageMutation$data;
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
    "concreteType": "SendDiscussionMessagePayload",
    "kind": "LinkedField",
    "name": "sendDiscussionMessage",
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
    "name": "useSendDiscussionMessageMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useSendDiscussionMessageMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c788e02444651953d30867790a496558",
    "id": null,
    "metadata": {},
    "name": "useSendDiscussionMessageMutation",
    "operationKind": "mutation",
    "text": "mutation useSendDiscussionMessageMutation(\n  $input: SendDiscussionMessageInput!\n) {\n  sendDiscussionMessage(input: $input) {\n    message {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6089f5cd44011a756e6e754a2a6ac0e5";

export default node;
