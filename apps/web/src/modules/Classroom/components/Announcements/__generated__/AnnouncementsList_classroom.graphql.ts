/**
 * @generated SignedSource<<e0a3c6fe854c8a689dd1026b0132f744>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AnnouncementsList_classroom$data = {
  readonly announcements: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"Announcement_classroomAnnouncement">;
      };
    }> | null;
    readonly pageInfo: {
      readonly hasNextPage: boolean;
      readonly endCursor: string | null;
    };
  } | null;
  readonly id: string;
  readonly " $fragmentType": "AnnouncementsList_classroom";
};
export type AnnouncementsList_classroom = AnnouncementsList_classroom$data;
export type AnnouncementsList_classroom$key = {
  readonly " $data"?: AnnouncementsList_classroom$data;
  readonly " $fragmentSpreads": FragmentRefs<"AnnouncementsList_classroom">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "announcements"
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
      "operation": require('./AnnouncementsListPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "AnnouncementsList_classroom",
  "selections": [
    {
      "alias": "announcements",
      "args": [
        {
          "kind": "Literal",
          "name": "order",
          "value": {
            "createdAt": "DESC"
          }
        }
      ],
      "concreteType": "AnnouncementsConnection",
      "kind": "LinkedField",
      "name": "__AnnouncementsList_announcements_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AnnouncementsEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "ClassroomAnnouncement",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "Announcement_classroomAnnouncement"
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
      "storageKey": "__AnnouncementsList_announcements_connection(order:{\"createdAt\":\"DESC\"})"
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

(node as any).hash = "ffb3c01ddc1894c02774a057926077b4";

export default node;
