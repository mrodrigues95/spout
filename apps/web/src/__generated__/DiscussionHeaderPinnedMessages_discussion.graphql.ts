/**
 * @generated SignedSource<<1bc9e20c8ed9df81aee35f0bcb64a0d9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
export type UserProfileColor = "SKY" | "PINK" | "GREEN" | "PURPLE" | "ROSE" | "GRAY" | "ORANGE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type DiscussionHeaderPinnedMessages_discussion$data = {
  readonly messages: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly content: string;
        readonly createdAt: string;
        readonly createdBy: {
          readonly id: string;
          readonly name: string;
          readonly avatarUrl: string | null;
          readonly profileColor: UserProfileColor;
        };
      };
    }> | null;
  } | null;
  readonly id: string;
  readonly " $fragmentType": "DiscussionHeaderPinnedMessages_discussion";
};
export type DiscussionHeaderPinnedMessages_discussion = DiscussionHeaderPinnedMessages_discussion$data;
export type DiscussionHeaderPinnedMessages_discussion$key = {
  readonly " $data"?: DiscussionHeaderPinnedMessages_discussion$data;
  readonly " $fragmentSpreads": FragmentRefs<"DiscussionHeaderPinnedMessages_discussion">;
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
      "operation": require('./DiscussionHeaderPinnedMessagesPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "DiscussionHeaderPinnedMessages_discussion",
  "selections": [
    {
      "alias": "messages",
      "args": [
        {
          "kind": "Literal",
          "name": "order",
          "value": {
            "createdAt": "ASC"
          }
        },
        {
          "kind": "Literal",
          "name": "where",
          "value": {
            "pinnedAt": {
              "neq": null
            }
          }
        }
      ],
      "concreteType": "MessagesConnection",
      "kind": "LinkedField",
      "name": "__DiscussionHeaderPinnedMessages_discussion_messages_connection",
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
                  "concreteType": "User",
                  "kind": "LinkedField",
                  "name": "createdBy",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/),
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "name",
                      "storageKey": null
                    },
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
      "storageKey": "__DiscussionHeaderPinnedMessages_discussion_messages_connection(order:{\"createdAt\":\"ASC\"},where:{\"pinnedAt\":{\"neq\":null}})"
    },
    (v1/*: any*/)
  ],
  "type": "Discussion",
  "abstractKey": null
};
})();

(node as any).hash = "32ebf19ba740cc9c607fe4fea77079e0";

export default node;
