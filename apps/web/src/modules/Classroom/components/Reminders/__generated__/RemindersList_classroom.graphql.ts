/**
 * @generated SignedSource<<2e2b763c7c555052f8f88dd682a5bec7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
export type ClassroomReminderImportance = "LOW" | "MEDIUM" | "HIGH" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type RemindersList_classroom$data = {
  readonly reminders: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly title: string;
        readonly description: string | null;
        readonly importance: ClassroomReminderImportance;
        readonly dueAt: string;
      };
    }> | null;
    readonly pageInfo: {
      readonly hasNextPage: boolean;
      readonly endCursor: string | null;
    };
  } | null;
  readonly id: string;
  readonly " $fragmentType": "RemindersList_classroom";
};
export type RemindersList_classroom = RemindersList_classroom$data;
export type RemindersList_classroom$key = {
  readonly " $data"?: RemindersList_classroom$data;
  readonly " $fragmentSpreads": FragmentRefs<"RemindersList_classroom">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "reminders"
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
      "operation": require('./RemindersListPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "RemindersList_classroom",
  "selections": [
    {
      "alias": "reminders",
      "args": [
        {
          "kind": "Literal",
          "name": "order",
          "value": {
            "dueAt": "ASC"
          }
        }
      ],
      "concreteType": "RemindersConnection",
      "kind": "LinkedField",
      "name": "__RemindersList_reminders_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "RemindersEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "ClassroomReminder",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "title",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "description",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "importance",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "dueAt",
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
      "storageKey": "__RemindersList_reminders_connection(order:{\"dueAt\":\"ASC\"})"
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

(node as any).hash = "84b96bb607e9d32ac64f77834b701a1a";

export default node;
