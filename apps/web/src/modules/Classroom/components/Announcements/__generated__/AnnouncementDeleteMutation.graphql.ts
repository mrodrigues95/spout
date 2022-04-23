/**
 * @generated SignedSource<<7b6baf8f15563bcdee09343d1689fd8d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteClassroomAnnouncementInput = {
  classroomAnnouncementId: string;
};
export type AnnouncementDeleteMutation$variables = {
  input: DeleteClassroomAnnouncementInput;
};
export type AnnouncementDeleteMutationVariables = AnnouncementDeleteMutation$variables;
export type AnnouncementDeleteMutation$data = {
  readonly deleteClassroomAnnouncement: {
    readonly classroomAnnouncement: {
      readonly id: string;
      readonly classroom: {
        readonly id: string;
      };
    } | null;
  };
};
export type AnnouncementDeleteMutationResponse = AnnouncementDeleteMutation$data;
export type AnnouncementDeleteMutation = {
  variables: AnnouncementDeleteMutationVariables;
  response: AnnouncementDeleteMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "DeleteClassroomAnnouncementPayload",
    "kind": "LinkedField",
    "name": "deleteClassroomAnnouncement",
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
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Classroom",
            "kind": "LinkedField",
            "name": "classroom",
            "plural": false,
            "selections": [
              (v1/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AnnouncementDeleteMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AnnouncementDeleteMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "a44cfcd1b33982001f53f3f14de9de84",
    "id": null,
    "metadata": {},
    "name": "AnnouncementDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation AnnouncementDeleteMutation(\n  $input: DeleteClassroomAnnouncementInput!\n) {\n  deleteClassroomAnnouncement(input: $input) {\n    classroomAnnouncement {\n      id\n      classroom {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "348f327ffc786402f342ab01babd63a1";

export default node;
