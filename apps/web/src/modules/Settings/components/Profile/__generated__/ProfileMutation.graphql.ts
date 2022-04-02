/**
 * @generated SignedSource<<043f70c274e120028f27f533aae25105>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateProfileInput = {
  name: string;
  bio?: string | null;
};
export type ProfileMutation$variables = {
  input: UpdateProfileInput;
};
export type ProfileMutationVariables = ProfileMutation$variables;
export type ProfileMutation$data = {
  readonly updateProfile: {
    readonly user: {
      readonly name: string;
      readonly bio: string | null;
    } | null;
  };
};
export type ProfileMutationResponse = ProfileMutation$data;
export type ProfileMutation = {
  variables: ProfileMutationVariables;
  response: ProfileMutation$data;
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
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "bio",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ProfileMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateProfilePayload",
        "kind": "LinkedField",
        "name": "updateProfile",
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
    "name": "ProfileMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateProfilePayload",
        "kind": "LinkedField",
        "name": "updateProfile",
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
    "cacheID": "ea0f7b516fba5420bdd31ecf3ba69640",
    "id": null,
    "metadata": {},
    "name": "ProfileMutation",
    "operationKind": "mutation",
    "text": "mutation ProfileMutation(\n  $input: UpdateProfileInput!\n) {\n  updateProfile(input: $input) {\n    user {\n      name\n      bio\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "9e86c4f6d5b841a1d31984e7c73c4b3b";

export default node;
