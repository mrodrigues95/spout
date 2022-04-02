/**
 * @generated SignedSource<<ed8250aeb4a48e9aaaf994d75272aae0>>
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
export type ProfilePhotoMutation$variables = {
  input: UpdateAvatarInput;
};
export type ProfilePhotoMutationVariables = ProfilePhotoMutation$variables;
export type ProfilePhotoMutation$data = {
  readonly updateAvatar: {
    readonly user: {
      readonly avatarUrl: string | null;
    } | null;
  };
};
export type ProfilePhotoMutationResponse = ProfilePhotoMutation$data;
export type ProfilePhotoMutation = {
  variables: ProfilePhotoMutationVariables;
  response: ProfilePhotoMutation$data;
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
    "name": "ProfilePhotoMutation",
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
    "name": "ProfilePhotoMutation",
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
    "cacheID": "78ccf9689da59a183efbbcd1bbeb3a6f",
    "id": null,
    "metadata": {},
    "name": "ProfilePhotoMutation",
    "operationKind": "mutation",
    "text": "mutation ProfilePhotoMutation(\n  $input: UpdateAvatarInput!\n) {\n  updateAvatar(input: $input) {\n    user {\n      avatarUrl\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4906235d979bb7981b6a083b46a1a563";

export default node;
