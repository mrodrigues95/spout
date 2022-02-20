/**
 * @generated SignedSource<<5765fc519cf597530624b7cd1eb0fec6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UnpinDiscussionMessageInput = {
  messageId: string;
};
export type useUnpinDiscussionMessageMutation$variables = {
  input: UnpinDiscussionMessageInput;
};
export type useUnpinDiscussionMessageMutationVariables = useUnpinDiscussionMessageMutation$variables;
export type useUnpinDiscussionMessageMutation$data = {
  readonly unpinDiscussionMessage: {
    readonly message: {
      readonly id: string;
      readonly pinnedBy: {
        readonly id: string;
        readonly name: string;
      } | null;
    } | null;
  };
};
export type useUnpinDiscussionMessageMutationResponse = useUnpinDiscussionMessageMutation$data;
export type useUnpinDiscussionMessageMutation = {
  variables: useUnpinDiscussionMessageMutationVariables;
  response: useUnpinDiscussionMessageMutation$data;
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
    "concreteType": "UnpinDiscussionMessagePayload",
    "kind": "LinkedField",
    "name": "unpinDiscussionMessage",
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
    "name": "useUnpinDiscussionMessageMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUnpinDiscussionMessageMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "c72b35ce86426d9f11bddf323c84a649",
    "id": null,
    "metadata": {},
    "name": "useUnpinDiscussionMessageMutation",
    "operationKind": "mutation",
    "text": "mutation useUnpinDiscussionMessageMutation(\n  $input: UnpinDiscussionMessageInput!\n) {\n  unpinDiscussionMessage(input: $input) {\n    message {\n      id\n      pinnedBy {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e72f8e83bfd5fee47e0ac0af0bb85026";

export default node;
