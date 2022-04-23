/**
 * @generated SignedSource<<534684e13b418b43ae7ca52fa5f30415>>
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
export type AnnouncementMutation$variables = {
  input: UpdateClassroomAnnouncementInput;
};
export type AnnouncementMutationVariables = AnnouncementMutation$variables;
export type AnnouncementMutation$data = {
  readonly updateClassroomAnnouncement: {
    readonly classroomAnnouncement: {
      readonly content: string;
      readonly updatedAt: string;
    } | null;
  };
};
export type AnnouncementMutationResponse = AnnouncementMutation$data;
export type AnnouncementMutation = {
  variables: AnnouncementMutationVariables;
  response: AnnouncementMutation$data;
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
    "name": "AnnouncementMutation",
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
    "name": "AnnouncementMutation",
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
    "cacheID": "6343e30d27d54b035d896e25520a91e1",
    "id": null,
    "metadata": {},
    "name": "AnnouncementMutation",
    "operationKind": "mutation",
    "text": "mutation AnnouncementMutation(\n  $input: UpdateClassroomAnnouncementInput!\n) {\n  updateClassroomAnnouncement(input: $input) {\n    classroomAnnouncement {\n      content\n      updatedAt\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4422a77f0c07d4c0cbfb70a1d8c41f15";

export default node;
