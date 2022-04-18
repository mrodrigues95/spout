/**
 * @generated SignedSource<<9b08f812e4a586c5a6b3a27e0b5b3854>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
export type UserProfileColor = "SKY" | "PINK" | "GREEN" | "PURPLE" | "ROSE" | "GRAY" | "ORANGE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ClassroomParticipants_classroom$data = {
  readonly users: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly avatarUrl: string | null;
        readonly name: string;
        readonly profileColor: UserProfileColor;
      };
    }> | null;
  } | null;
  readonly id: string;
  readonly " $fragmentType": "ClassroomParticipants_classroom";
};
export type ClassroomParticipants_classroom = ClassroomParticipants_classroom$data;
export type ClassroomParticipants_classroom$key = {
  readonly " $data"?: ClassroomParticipants_classroom$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClassroomParticipants_classroom">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "users"
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
      "operation": require('./ClassroomParticipantsListPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "ClassroomParticipants_classroom",
  "selections": [
    {
      "alias": "users",
      "args": null,
      "concreteType": "UsersConnection",
      "kind": "LinkedField",
      "name": "__ClassroomParticipantsList_classroom_users_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "UsersEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "User",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v1/*: any*/),
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
                  "name": "name",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "profileColor",
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
      "storageKey": null
    },
    (v1/*: any*/)
  ],
  "type": "Classroom",
  "abstractKey": null
};
})();

(node as any).hash = "39896cb794f31be9b77b114fc80ff839";

export default node;
