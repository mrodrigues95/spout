/**
 * @generated SignedSource<<8b3ad4d685f071e5e14abd3d7697a3db>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateAvatarInput = {
  avatarUrl?: string | null;
};
export type SettingsProfilePhotoMutation$variables = {
  input: UpdateAvatarInput;
};
export type SettingsProfilePhotoMutationVariables = SettingsProfilePhotoMutation$variables;
export type SettingsProfilePhotoMutation$data = {
  readonly updateAvatar: {
    readonly user: {
      readonly avatarUrl: string | null;
    } | null;
  };
};
export type SettingsProfilePhotoMutationResponse = SettingsProfilePhotoMutation$data;
export type SettingsProfilePhotoMutation = {
  variables: SettingsProfilePhotoMutationVariables;
  response: SettingsProfilePhotoMutation$data;
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
  "name": "avatarUrl",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsProfilePhotoMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateAvatarPayload",
        "kind": "LinkedField",
        "name": "updateAvatar",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v2/*: any*/)
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
    "name": "SettingsProfilePhotoMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateAvatarPayload",
        "kind": "LinkedField",
        "name": "updateAvatar",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
    "cacheID": "44dbd6d23fb7d6648e67ea0f7712bf44",
    "id": null,
    "metadata": {},
    "name": "SettingsProfilePhotoMutation",
    "operationKind": "mutation",
    "text": "mutation SettingsProfilePhotoMutation(\n  $input: UpdateAvatarInput!\n) {\n  updateAvatar(input: $input) {\n    user {\n      avatarUrl\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a66395277186d59ea566ced8e9d97641";

export default node;
