/**
 * @generated SignedSource<<0ba543f7d9e81caeb140331e1715a660>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type PinOrUnpinDiscussionMessageInput = {
  messageId: string;
};
export type usePinOrUnpinDiscussionMessageMutation$variables = {
  input: PinOrUnpinDiscussionMessageInput;
};
export type usePinOrUnpinDiscussionMessageMutationVariables = usePinOrUnpinDiscussionMessageMutation$variables;
export type usePinOrUnpinDiscussionMessageMutation$data = {
  readonly pinOrUnpinDiscussionMessage: {
    readonly message: {
      readonly id: string;
      readonly pinnedBy: {
        readonly id: string;
        readonly name: string;
      } | null;
    } | null;
  };
};
export type usePinOrUnpinDiscussionMessageMutationResponse = usePinOrUnpinDiscussionMessageMutation$data;
export type usePinOrUnpinDiscussionMessageMutation = {
  variables: usePinOrUnpinDiscussionMessageMutationVariables;
  response: usePinOrUnpinDiscussionMessageMutation$data;
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
    "concreteType": "PinOrUnpinDiscussionMessagePayload",
    "kind": "LinkedField",
    "name": "pinOrUnpinDiscussionMessage",
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
    "name": "usePinOrUnpinDiscussionMessageMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "usePinOrUnpinDiscussionMessageMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "e519706196323ec5b2e9dca7f2a5bdbc",
    "id": null,
    "metadata": {},
    "name": "usePinOrUnpinDiscussionMessageMutation",
    "operationKind": "mutation",
    "text": "mutation usePinOrUnpinDiscussionMessageMutation(\n  $input: PinOrUnpinDiscussionMessageInput!\n) {\n  pinOrUnpinDiscussionMessage(input: $input) {\n    message {\n      id\n      pinnedBy {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "edc3f159034d03abfcb232c6a81ca622";

export default node;
