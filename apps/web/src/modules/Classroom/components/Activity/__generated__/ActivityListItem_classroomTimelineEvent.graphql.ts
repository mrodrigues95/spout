/**
 * @generated SignedSource<<de071dc847c22e49926e3b5db39746f4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ClassroomTimelineEventItem = "CLASSROOM_CREATED" | "DISCUSSION_CREATED" | "SYLLABUS_CREATED" | "SYLLABUS_UPDATED" | "ANNOUNCEMENT_CREATED" | "ANNOUNCEMENT_UPDATED" | "REMINDER_CREATED" | "USER_JOINED_CLASSROOM" | "%future added value";
export type UserProfileColor = "SKY" | "PINK" | "GREEN" | "PURPLE" | "ROSE" | "GRAY" | "ORANGE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ActivityListItem_classroomTimelineEvent$data = {
  readonly event: ClassroomTimelineEventItem;
  readonly createdAt: string;
  readonly triggeredBy: {
    readonly name: string;
    readonly avatarUrl: string | null;
    readonly profileColor: UserProfileColor;
  };
  readonly classroom: {
    readonly id: string;
    readonly name: string;
  };
  readonly discussion: {
    readonly id: string;
    readonly name: string;
  } | null;
  readonly syllabus: {
    readonly content: string;
  } | null;
  readonly announcement: {
    readonly content: string;
  } | null;
  readonly " $fragmentType": "ActivityListItem_classroomTimelineEvent";
};
export type ActivityListItem_classroomTimelineEvent = ActivityListItem_classroomTimelineEvent$data;
export type ActivityListItem_classroomTimelineEvent$key = {
  readonly " $data"?: ActivityListItem_classroomTimelineEvent$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityListItem_classroomTimelineEvent">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  },
  (v0/*: any*/)
],
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "content",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityListItem_classroomTimelineEvent",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "event",
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
      "name": "triggeredBy",
      "plural": false,
      "selections": [
        (v0/*: any*/),
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
      "concreteType": "Classroom",
      "kind": "LinkedField",
      "name": "classroom",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Discussion",
      "kind": "LinkedField",
      "name": "discussion",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ClassroomSyllabus",
      "kind": "LinkedField",
      "name": "syllabus",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ClassroomAnnouncement",
      "kind": "LinkedField",
      "name": "announcement",
      "plural": false,
      "selections": (v2/*: any*/),
      "storageKey": null
    }
  ],
  "type": "ClassroomTimelineEvent",
  "abstractKey": null
};
})();

(node as any).hash = "b0a8a123f793b29b8a399da00c67abed";

export default node;
