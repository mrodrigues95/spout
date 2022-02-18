/**
 * @generated SignedSource<<ec31fa1fc9668ebd550e26a57355f334>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DiscussionEvent = "CHANGE_TOPIC" | "CHANGE_DESCRIPTION" | "%future added value";
export type UserProfileColor = "SKY" | "PINK" | "GREEN" | "PURPLE" | "ROSE" | "GRAY" | "ORANGE" | "%future added value";
export type WhitelistedFileExtension = "AAC" | "CSV" | "PDF" | "XLS" | "XLSX" | "PPT" | "PPTX" | "BMP" | "GIF" | "JPEG" | "JPG" | "JPE" | "PNG" | "TIFF" | "TIF" | "TXT" | "TEXT" | "RTF" | "DOC" | "DOCX" | "DOT" | "DOTX" | "DWG" | "DWF" | "DXF" | "MP3" | "MP4" | "WAV" | "AVI" | "MOV" | "MPEG" | "WMV" | "ZIP" | "%future added value";
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
      readonly pinnedBy: {
        readonly id: string;
        readonly name: string;
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
  "name": "name",
  "storageKey": null
},
v3 = [
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
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "pinnedBy",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/)
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
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DiscussionOptimisticMessageMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "27448dbb0661602d42059c23cced3674",
    "id": null,
    "metadata": {},
    "name": "DiscussionOptimisticMessageMutation",
    "operationKind": "mutation",
    "text": "mutation DiscussionOptimisticMessageMutation(\n  $input: SendDiscussionMessageInput!\n) {\n  sendDiscussionMessage(input: $input) {\n    message {\n      id\n      content\n      createdAt\n      isDiscussionEvent\n      discussionEvent\n      attachments {\n        id\n        location\n        name\n        contentLength\n        extension\n      }\n      createdBy {\n        id\n        name\n        avatarUrl\n        profileColor\n      }\n      pinnedBy {\n        id\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "14eb1c6056eef75ded98add3c6513405";

export default node;
