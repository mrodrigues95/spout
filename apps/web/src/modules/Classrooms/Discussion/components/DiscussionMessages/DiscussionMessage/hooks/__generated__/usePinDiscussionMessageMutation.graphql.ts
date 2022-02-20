/**
 * @generated SignedSource<<ee7af0eab8f8b792d84f9d7df3b3d214>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type PinDiscussionMessageInput = {
  messageId: string;
};
export type usePinDiscussionMessageMutation$variables = {
  input: PinDiscussionMessageInput;
};
export type usePinDiscussionMessageMutationVariables = usePinDiscussionMessageMutation$variables;
export type usePinDiscussionMessageMutation$data = {
  readonly pinDiscussionMessage: {
    readonly message: {
      readonly id: string;
      readonly pinnedBy: {
        readonly id: string;
        readonly name: string;
      } | null;
    } | null;
  };
};
export type usePinDiscussionMessageMutationResponse = usePinDiscussionMessageMutation$data;
export type usePinDiscussionMessageMutation = {
  variables: usePinDiscussionMessageMutationVariables;
  response: usePinDiscussionMessageMutation$data;
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
    "concreteType": "PinDiscussionMessagePayload",
    "kind": "LinkedField",
    "name": "pinDiscussionMessage",
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
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "pinnedBy",
            "plural": false,
            "selections": [
              (v1/*: any*/),
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "usePinDiscussionMessageMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "usePinDiscussionMessageMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "6d603baa430f3a97f4941133017178a2",
    "id": null,
    "metadata": {},
    "name": "usePinDiscussionMessageMutation",
    "operationKind": "mutation",
    "text": "mutation usePinDiscussionMessageMutation(\n  $input: PinDiscussionMessageInput!\n) {\n  pinDiscussionMessage(input: $input) {\n    message {\n      id\n      pinnedBy {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f0b780747320539def30e9427e6e80e6";

export default node;
