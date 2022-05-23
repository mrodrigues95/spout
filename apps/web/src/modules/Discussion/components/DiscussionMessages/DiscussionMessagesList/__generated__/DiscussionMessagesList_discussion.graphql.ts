/**
 * @generated SignedSource<<f3a54e2723c14bad2957ec0414b63899>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
export type MessageEvent = "CHANGE_TOPIC" | "CHANGE_DESCRIPTION" | "PINNED_MESSAGE" | "UNPINNED_MESSAGE" | "%future added value";
export type UserProfileColor = "SKY" | "PINK" | "GREEN" | "PURPLE" | "ROSE" | "GRAY" | "ORANGE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type DiscussionMessagesList_discussion$data = {
  readonly id: string;
  readonly messages: {
    readonly edges: ReadonlyArray<{
      readonly node: {
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
      };
    }> | null;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"DiscussionMessagesListHeader_discussion">;
  readonly " $fragmentType": "DiscussionMessagesList_discussion";
};
export type DiscussionMessagesList_discussion = DiscussionMessagesList_discussion$data;
export type DiscussionMessagesList_discussion$key = {
  readonly " $data"?: DiscussionMessagesList_discussion$data;
  readonly " $fragmentSpreads": FragmentRefs<"DiscussionMessagesList_discussion">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "messages"
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
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "count"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "cursor"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "backward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": null,
        "backward": {
          "count": "count",
          "cursor": "cursor"
        },
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [
        "node"
      ],
      "operation": require('./DiscussionMessagesListPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "DiscussionMessagesList_discussion",
  "selections": [
    (v1/*: any*/),
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DiscussionMessagesListHeader_discussion"
    },
    {
      "alias": "messages",
      "args": [
        {
          "kind": "Literal",
          "name": "order",
          "value": {
            "createdAt": "ASC"
          }
        }
      ],
      "concreteType": "MessagesConnection",
      "kind": "LinkedField",
      "name": "__DiscussionMessagesList_discussion_messages_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "MessagesEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Message",
              "kind": "LinkedField",
              "name": "node",
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
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasPreviousPage",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "startCursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "__DiscussionMessagesList_discussion_messages_connection(order:{\"createdAt\":\"ASC\"})"
    }
  ],
  "type": "Discussion",
  "abstractKey": null
};
})();

(node as any).hash = "1cc46323cf2f1632831bea4189050e86";

export default node;
