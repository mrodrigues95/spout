/**
 * @generated SignedSource<<79d57fe479553ee6d71997af97474d43>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type MessageEvent = "CHANGE_TOPIC" | "CHANGE_DESCRIPTION" | "PINNED_MESSAGE" | "UNPINNED_MESSAGE" | "%future added value";
export type UserProfileColor = "SKY" | "PINK" | "GREEN" | "PURPLE" | "ROSE" | "GRAY" | "ORANGE" | "%future added value";
export type WhitelistedFileExtension = "AAC" | "CSV" | "PDF" | "XLS" | "XLSX" | "PPT" | "PPTX" | "BMP" | "GIF" | "JPEG" | "JPG" | "JPE" | "PNG" | "TIFF" | "TIF" | "TXT" | "TEXT" | "RTF" | "DOC" | "DOCX" | "DOT" | "DOTX" | "DWG" | "DWF" | "DXF" | "MP3" | "MP4" | "WAV" | "AVI" | "MOV" | "MPEG" | "WMV" | "ZIP" | "%future added value";
export type useDiscussionMessagesSubscription$variables = {
  discussionId: string;
};
export type useDiscussionMessagesSubscriptionVariables = useDiscussionMessagesSubscription$variables;
export type useDiscussionMessagesSubscription$data = {
  readonly onDiscussionMessageReceived: {
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
        readonly extension: WhitelistedFileExtension;
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
    };
  };
};
export type useDiscussionMessagesSubscriptionResponse = useDiscussionMessagesSubscription$data;
export type useDiscussionMessagesSubscription = {
  variables: useDiscussionMessagesSubscriptionVariables;
  response: useDiscussionMessagesSubscription$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "discussionId"
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
        "name": "discussionId",
        "variableName": "discussionId"
      }
    ],
    "concreteType": "DiscussionMessageSubscriptionPayload",
    "kind": "LinkedField",
    "name": "onDiscussionMessageReceived",
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
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "extension",
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
    "name": "useDiscussionMessagesSubscription",
    "selections": (v5/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useDiscussionMessagesSubscription",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "0ba16b10e1e0f431e3b571f6cecba7fe",
    "id": null,
    "metadata": {
      "subscriptionName": "onDiscussionMessageReceived"
    },
    "name": "useDiscussionMessagesSubscription",
    "operationKind": "subscription",
    "text": "subscription useDiscussionMessagesSubscription(\n  $discussionId: ID!\n) {\n  onDiscussionMessageReceived(discussionId: $discussionId) {\n    message {\n      id\n      content\n      createdAt\n      isEvent\n      messageEvent\n      attachments {\n        id\n        location\n        name\n        contentLength\n        extension\n      }\n      createdBy {\n        id\n        name\n        avatarUrl\n        profileColor\n      }\n      pinnedBy {\n        id\n        name\n      }\n      parentMessage {\n        id\n        content\n        createdBy {\n          id\n          name\n          avatarUrl\n          profileColor\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "600bc6bb7690b5a16c6e0241955916a6";

export default node;
