/**
 * @generated SignedSource<<2364edebd81ed3648bd9fd31717e82de>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateClassroomAnnouncementInput = {
  classroomId: string;
  content: string;
};
export type CreateAnnouncementMutation$variables = {
  input: CreateClassroomAnnouncementInput;
};
export type CreateAnnouncementMutationVariables = CreateAnnouncementMutation$variables;
export type CreateAnnouncementMutation$data = {
  readonly createClassroomAnnouncement: {
    readonly classroomAnnouncement: {
      readonly " $fragmentSpreads": FragmentRefs<"Announcement_classroomAnnouncement">;
    } | null;
  };
};
export type CreateAnnouncementMutationResponse = CreateAnnouncementMutation$data;
export type CreateAnnouncementMutation = {
  variables: CreateAnnouncementMutationVariables;
  response: CreateAnnouncementMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateAnnouncementMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateClassroomAnnouncementPayload",
        "kind": "LinkedField",
        "name": "createClassroomAnnouncement",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ClassroomAnnouncement",
            "kind": "LinkedField",
            "name": "classroomAnnouncement",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Announcement_classroomAnnouncement"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateAnnouncementMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateClassroomAnnouncementPayload",
        "kind": "LinkedField",
        "name": "createClassroomAnnouncement",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ClassroomAnnouncement",
            "kind": "LinkedField",
            "name": "classroomAnnouncement",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
                "kind": "ScalarField",
                "name": "updatedAt",
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
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "93c99d61ac12c96d5cf2eb0df241d3fd",
    "id": null,
    "metadata": {},
    "name": "CreateAnnouncementMutation",
    "operationKind": "mutation",
    "text": "mutation CreateAnnouncementMutation(\n  $input: CreateClassroomAnnouncementInput!\n) {\n  createClassroomAnnouncement(input: $input) {\n    classroomAnnouncement {\n      ...Announcement_classroomAnnouncement\n      id\n    }\n  }\n}\n\nfragment Announcement_classroomAnnouncement on ClassroomAnnouncement {\n  id\n  content\n  createdAt\n  updatedAt\n  createdBy {\n    name\n    avatarUrl\n    profileColor\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "dbf4098a863b61d58efed442889550ec";

export default node;
