/**
 * @generated SignedSource<<519eaef8eb4edb9994c652f26996bc81>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityList_classroom$data = {
  readonly timeline: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"ActivityListItem_classroomTimelineEvent">;
      };
    }> | null;
    readonly pageInfo: {
      readonly hasNextPage: boolean;
      readonly endCursor: string | null;
    };
  } | null;
  readonly id: string;
  readonly " $fragmentType": "ActivityList_classroom";
};
export type ActivityList_classroom = ActivityList_classroom$data;
export type ActivityList_classroom$key = {
  readonly " $data"?: ActivityList_classroom$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityList_classroom">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "timeline"
];
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
      "operation": require('./ActivityListPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "ActivityList_classroom",
  "selections": [
    {
      "alias": "timeline",
      "args": [
        {
          "kind": "Literal",
          "name": "order",
          "value": {
            "createdAt": "DESC"
          }
        }
      ],
      "concreteType": "TimelineConnection",
      "kind": "LinkedField",
      "name": "__ActivityList_timeline_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "TimelineEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "ClassroomTimelineEvent",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ActivityListItem_classroomTimelineEvent"
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
              "name": "hasNextPage",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "__ActivityList_timeline_connection(order:{\"createdAt\":\"DESC\"})"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Classroom",
  "abstractKey": null
};
})();

(node as any).hash = "2f5c101809fe571a1f362ebff0c12376";

export default node;
