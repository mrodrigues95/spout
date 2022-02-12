/**
 * @generated SignedSource<<d29dddd2f268d1c01adb8118def5a1e2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type DiscussionEvent = "CHANGE_TOPIC" | "CHANGE_DESCRIPTION" | "%future added value";
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
      readonly isDiscussionEvent: boolean;
      readonly discussionEvent: DiscussionEvent | null;
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
  "name": "name",
  "storageKey": null
},
v3 = [
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "content",
            "storageKey": null
          },
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
            "name": "isDiscussionEvent",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "discussionEvent",
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
              (v2/*: any*/),
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
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "createdBy",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/),
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
    "selections": (v3/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useDiscussionMessagesSubscription",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "0069a1fb4d435e97fafcada5b9188d86",
    "id": null,
    "metadata": {
      "subscriptionName": "onDiscussionMessageReceived"
    },
    "name": "useDiscussionMessagesSubscription",
    "operationKind": "subscription",
    "text": "subscription useDiscussionMessagesSubscription(\n  $discussionId: ID!\n) {\n  onDiscussionMessageReceived(discussionId: $discussionId) {\n    message {\n      id\n      content\n      createdAt\n      isDiscussionEvent\n      discussionEvent\n      attachments {\n        id\n        location\n        name\n        contentLength\n        extension\n      }\n      createdBy {\n        id\n        name\n        avatarUrl\n        profileColor\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4a3dc75e418a42ed7f870b40834de643";

export default node;
