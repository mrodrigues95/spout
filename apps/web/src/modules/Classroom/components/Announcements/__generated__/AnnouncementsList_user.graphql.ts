/**
 * @generated SignedSource<<2735eb5fbd6b56b036e399a6251699ff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AnnouncementsList_user$data = {
  readonly " $fragmentSpreads": FragmentRefs<"Announcement_user">;
  readonly " $fragmentType": "AnnouncementsList_user";
};
export type AnnouncementsList_user = AnnouncementsList_user$data;
export type AnnouncementsList_user$key = {
  readonly " $data"?: AnnouncementsList_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"AnnouncementsList_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "classroomId"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "AnnouncementsList_user",
  "selections": [
    {
      "args": [
        {
          "kind": "Variable",
          "name": "classroomId",
          "variableName": "classroomId"
        }
      ],
      "kind": "FragmentSpread",
      "name": "Announcement_user"
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "487b676ab638072ea9fa0b4053472fdd";

export default node;
