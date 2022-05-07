/**
 * @generated SignedSource<<0387a71d4b14316f3ff596d165a55ef6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DiscussionsMenu_discussions$data = {
  readonly id: string;
  readonly discussions: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
      };
    }> | null;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"CreateDiscussion_classroom">;
  readonly " $fragmentType": "DiscussionsMenu_discussions";
};
export type DiscussionsMenu_discussions = DiscussionsMenu_discussions$data;
export type DiscussionsMenu_discussions$key = {
  readonly " $data"?: DiscussionsMenu_discussions$data;
  readonly " $fragmentSpreads": FragmentRefs<"DiscussionsMenu_discussions">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "discussions"
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
      "defaultValue": 50,
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
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "count",
          "cursor": "cursor"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [
        "node"
      ],
      "operation": require('./DiscussionsMenuListPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "DiscussionsMenu_discussions",
  "selections": [
    (v1/*: any*/),
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CreateDiscussion_classroom"
    },
    {
      "alias": "discussions",
      "args": [
        {
          "kind": "Literal",
          "name": "order",
          "value": {
            "name": "ASC"
          }
        }
      ],
      "concreteType": "DiscussionsConnection",
      "kind": "LinkedField",
      "name": "__DiscussionsMenu_discussions_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "DiscussionsEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Discussion",
              "kind": "LinkedField",
              "name": "node",
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
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "__DiscussionsMenu_discussions_connection(order:{\"name\":\"ASC\"})"
    }
  ],
  "type": "Classroom",
  "abstractKey": null
};
})();

(node as any).hash = "284ab578734033a8c5edd467872ea823";

export default node;
