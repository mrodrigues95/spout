/**
 * @generated SignedSource<<cb4e8432dfaac74e543f03209d2b76a5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DiscussionHeader_discussion$data = {
  readonly id: string;
  readonly name: string;
  readonly classroom: {
    readonly id: string;
    readonly discussions: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string;
          readonly name: string;
        };
      }> | null;
    } | null;
  };
  readonly " $fragmentType": "DiscussionHeader_discussion";
};
export type DiscussionHeader_discussion = DiscussionHeader_discussion$data;
export type DiscussionHeader_discussion$key = {
  readonly " $data"?: DiscussionHeader_discussion$data;
  readonly " $fragmentSpreads": FragmentRefs<"DiscussionHeader_discussion">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "classroom",
  "discussions"
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
      "operation": require('./DiscussionHeaderPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "DiscussionHeader_discussion",
  "selections": [
    (v1/*: any*/),
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Classroom",
      "kind": "LinkedField",
      "name": "classroom",
      "plural": false,
      "selections": [
        (v1/*: any*/),
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
          "name": "__DiscussionHeader_classroom_discussions_connection",
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
                    (v2/*: any*/),
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
          "storageKey": "__DiscussionHeader_classroom_discussions_connection(order:{\"name\":\"ASC\"})"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Discussion",
  "abstractKey": null
};
})();

(node as any).hash = "be7ca1d5d5c7c100d030bab2db67e462";

export default node;
