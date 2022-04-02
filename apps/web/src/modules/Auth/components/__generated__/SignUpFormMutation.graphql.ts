/**
 * @generated SignedSource<<3ce744e30244f5ce629e974f718589bf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SignUpInput = {
  name: string;
  email: string;
  password: string;
};
export type SignUpFormMutation$variables = {
  input: SignUpInput;
};
export type SignUpFormMutationVariables = SignUpFormMutation$variables;
export type SignUpFormMutation$data = {
  readonly signUp: {
    readonly authPayload: {
      readonly session: {
        readonly id: string;
      } | null;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly message?: string;
    }> | null;
  };
};
export type SignUpFormMutationResponse = SignUpFormMutation$data;
export type SignUpFormMutation = {
  variables: SignUpFormMutationVariables;
  response: SignUpFormMutation$data;
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
  "concreteType": "AuthPayload",
  "kind": "LinkedField",
  "name": "authPayload",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Session",
      "kind": "LinkedField",
      "name": "session",
      "plural": false,
      "selections": [
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
},
v3 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "message",
      "storageKey": null
    }
  ],
  "type": "SignUpNewUserError",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SignUpFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SignUpPayload",
        "kind": "LinkedField",
        "name": "signUp",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
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
    "name": "SignUpFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SignUpPayload",
        "kind": "LinkedField",
        "name": "signUp",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2ea584099c7de354220dfb979dba7caa",
    "id": null,
    "metadata": {},
    "name": "SignUpFormMutation",
    "operationKind": "mutation",
    "text": "mutation SignUpFormMutation(\n  $input: SignUpInput!\n) {\n  signUp(input: $input) {\n    authPayload {\n      session {\n        id\n      }\n    }\n    errors {\n      __typename\n      ... on SignUpNewUserError {\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "cb093d89e433666749ced55a5c866e85";

export default node;
