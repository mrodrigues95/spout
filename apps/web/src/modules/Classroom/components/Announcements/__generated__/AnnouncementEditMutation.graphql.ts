/**
 * @generated SignedSource<<5522d93babe79afef11859db4504569f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateClassroomAnnouncementInput = {
  classroomAnnouncementId: string;
  content: string;
};
export type AnnouncementEditMutation$variables = {
  input: UpdateClassroomAnnouncementInput;
};
export type AnnouncementEditMutationVariables = AnnouncementEditMutation$variables;
export type AnnouncementEditMutation$data = {
  readonly updateClassroomAnnouncement: {
    readonly classroomAnnouncement: {
      readonly content: string;
      readonly updatedAt: string;
    } | null;
  };
};
export type AnnouncementEditMutationResponse = AnnouncementEditMutation$data;
export type AnnouncementEditMutation = {
  variables: AnnouncementEditMutationVariables;
  response: AnnouncementEditMutation$data;
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
  "name": "content",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AnnouncementEditMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateClassroomAnnouncementPayload",
        "kind": "LinkedField",
        "name": "updateClassroomAnnouncement",
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
              (v3/*: any*/)
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
    "name": "AnnouncementEditMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateClassroomAnnouncementPayload",
        "kind": "LinkedField",
        "name": "updateClassroomAnnouncement",
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
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
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
    "cacheID": "a088b0a71b0e538384212758116ea77f",
    "id": null,
    "metadata": {},
    "name": "AnnouncementEditMutation",
    "operationKind": "mutation",
    "text": "mutation AnnouncementEditMutation(\n  $input: UpdateClassroomAnnouncementInput!\n) {\n  updateClassroomAnnouncement(input: $input) {\n    classroomAnnouncement {\n      content\n      updatedAt\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "bc607055ba66b8e1af1b8c8a36465c87";

export default node;
