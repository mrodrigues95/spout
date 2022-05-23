/**
 * @generated SignedSource<<fda66c2d7220bf2fdd2991b40d69eabb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type MessageEvent = "CHANGE_TOPIC" | "CHANGE_DESCRIPTION" | "PINNED_MESSAGE" | "UNPINNED_MESSAGE" | "%future added value";
export type UserProfileColor = "SKY" | "PINK" | "GREEN" | "PURPLE" | "ROSE" | "GRAY" | "ORANGE" | "%future added value";
export type SendDiscussionMessageInput = {
  discussionId: string;
  fileIds: ReadonlyArray<string>;
  content: string;
};
export type DiscussionOptimisticMessageMutation$variables = {
  input: SendDiscussionMessageInput;
};
export type DiscussionOptimisticMessageMutationVariables = DiscussionOptimisticMessageMutation$variables;
export type DiscussionOptimisticMessageMutation$data = {
  readonly sendDiscussionMessage: {
    readonly message: {
      readonly id: string;
      readonly content: string;
      readonly createdAt: string;
      readonly isEvent: boolean;
      readonly messageEvent: MessageEvent | null;
      readonly attachments: ReadonlyArray<{
        readonly id: string;
        readonly location: string | null;
        readonly name: string;
        readonly contentLength: any;
      }>;
      readonly createdBy: {
        readonly id: string;
        readonly name: string;
        readonly avatarUrl: string | null;
        readonly profileColor: UserProfileColor;
      };
      readonly pinnedBy: {
        readonly id: string;
        readonly name: string;
      } | null;
      readonly parentMessage: {
        readonly id: string;
        readonly content: string;
        readonly createdBy: {
          readonly id: string;
          readonly name: string;
          readonly avatarUrl: string | null;
          readonly profileColor: UserProfileColor;
        };
      } | null;
    } | null;
  };
};
export type DiscussionOptimisticMessageMutationResponse = DiscussionOptimisticMessageMutation$data;
export type DiscussionOptimisticMessageMutation = {
  variables: DiscussionOptimisticMessageMutationVariables;
  response: DiscussionOptimisticMessageMutation$data;
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "content",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "createdBy",
  "plural": false,
  "selections": [
    (v1/*: any*/),
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "avatarUrl",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "profileColor",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v5 = [
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
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "createdAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isEvent",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "messageEvent",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "File",
            "kind": "LinkedField",
            "name": "attachments",
            "plural": true,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "location",
                "storageKey": null
              },
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "contentLength",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "pinnedBy",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Message",
            "kind": "LinkedField",
            "name": "parentMessage",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/),
              (v4/*: any*/)
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
    "name": "DiscussionOptimisticMessageMutation",
    "selections": (v5/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DiscussionOptimisticMessageMutation",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "cfbcc830b091350e1e1a15d677723f04",
    "id": null,
    "metadata": {},
    "name": "DiscussionOptimisticMessageMutation",
    "operationKind": "mutation",
    "text": "mutation DiscussionOptimisticMessageMutation(\n  $input: SendDiscussionMessageInput!\n) {\n  sendDiscussionMessage(input: $input) {\n    message {\n      id\n      content\n      createdAt\n      isEvent\n      messageEvent\n      attachments {\n        id\n        location\n        name\n        contentLength\n      }\n      createdBy {\n        id\n        name\n        avatarUrl\n        profileColor\n      }\n      pinnedBy {\n        id\n        name\n      }\n      parentMessage {\n        id\n        content\n        createdBy {\n          id\n          name\n          avatarUrl\n          profileColor\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "9ba938acf41c7d720a2f89025eeb5052";

export default node;
