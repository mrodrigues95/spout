/**
 * @generated SignedSource<<3961a5380a4c07908541701e9feedc5a>>
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
    readonly pinnedOrUnpinnedDiscussionMessagePayload: {
      readonly message: {
        readonly id: string;
        readonly pinnedBy: {
          readonly id: string;
          readonly name: string;
        } | null;
      } | null;
      readonly deletedEventMessageId: string | null;
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
        "concreteType": "PinnedOrUnpinnedDiscussionMessagePayload",
        "kind": "LinkedField",
        "name": "pinnedOrUnpinnedDiscussionMessagePayload",
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "deletedEventMessageId",
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
    "cacheID": "ae43a1b93c3e427b7716bcd11bc1bbb5",
    "id": null,
    "metadata": {},
    "name": "usePinOrUnpinDiscussionMessageMutation",
    "operationKind": "mutation",
    "text": "mutation usePinOrUnpinDiscussionMessageMutation(\n  $input: PinOrUnpinDiscussionMessageInput!\n) {\n  pinOrUnpinDiscussionMessage(input: $input) {\n    pinnedOrUnpinnedDiscussionMessagePayload {\n      message {\n        id\n        pinnedBy {\n          id\n          name\n        }\n      }\n      deletedEventMessageId\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "74c555ad7a4959641b98bac95edb871c";

export default node;
