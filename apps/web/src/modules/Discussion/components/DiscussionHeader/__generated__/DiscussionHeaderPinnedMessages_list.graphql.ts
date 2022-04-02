/**
 * @generated SignedSource<<44ffd8651a19275f94813e01afe803b4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DiscussionHeaderPinnedMessages_list$data = {
  readonly messages: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"DiscussionHeaderPinnedMessages_message">;
      };
    }> | null;
  } | null;
  readonly id: string;
  readonly " $fragmentType": "DiscussionHeaderPinnedMessages_list";
};
export type DiscussionHeaderPinnedMessages_list = DiscussionHeaderPinnedMessages_list$data;
export type DiscussionHeaderPinnedMessages_list$key = {
  readonly " $data"?: DiscussionHeaderPinnedMessages_list$data;
  readonly " $fragmentSpreads": FragmentRefs<"DiscussionHeaderPinnedMessages_list">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "messages"
];
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
      "operation": require('./DiscussionHeaderPinnedMessagesListPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "DiscussionHeaderPinnedMessages_list",
  "selections": [
    {
      "alias": "messages",
      "args": [
        {
          "kind": "Literal",
          "name": "order",
          "value": {
            "pinnedAt": "DESC"
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
      "name": "__DiscussionHeaderPinnedMessagesList_discussion_messages_connection",
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
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "DiscussionHeaderPinnedMessages_message"
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
      "storageKey": "__DiscussionHeaderPinnedMessagesList_discussion_messages_connection(order:{\"pinnedAt\":\"DESC\"},where:{\"pinnedAt\":{\"neq\":null}})"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Discussion",
  "abstractKey": null
};
})();

(node as any).hash = "01f7f05d65f1f7dc1c20969817f1bcbc";

export default node;
