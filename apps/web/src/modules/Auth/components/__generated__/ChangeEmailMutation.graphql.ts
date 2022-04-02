/**
 * @generated SignedSource<<0443230554c067e3886121082cac0b2a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ChangeEmailInput = {
  sessionId: string;
  token: string;
};
export type ChangeEmailMutation$variables = {
  input: ChangeEmailInput;
};
export type ChangeEmailMutationVariables = ChangeEmailMutation$variables;
export type ChangeEmailMutation$data = {
  readonly changeEmail: {
    readonly authPayload: {
      readonly user: {
        readonly email: string;
        readonly emailConfirmed: boolean;
      } | null;
    } | null;
    readonly errors: ReadonlyArray<{
      readonly message?: string;
    }> | null;
  };
};
export type ChangeEmailMutationResponse = ChangeEmailMutation$data;
export type ChangeEmailMutation = {
  variables: ChangeEmailMutationVariables;
  response: ChangeEmailMutation$data;
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
  "name": "email",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "emailConfirmed",
  "storageKey": null
},
v4 = {
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
  "type": "InvalidTokenError",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChangeEmailMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ChangeEmailPayload",
        "kind": "LinkedField",
        "name": "changeEmail",
        "plural": false,
        "selections": [
          {
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
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
            "selections": [
              (v4/*: any*/)
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
    "name": "ChangeEmailMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ChangeEmailPayload",
        "kind": "LinkedField",
        "name": "changeEmail",
        "plural": false,
        "selections": [
          {
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
          },
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
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b3c5c64731c1679bb3c8a8c9c9ac4cec",
    "id": null,
    "metadata": {},
    "name": "ChangeEmailMutation",
    "operationKind": "mutation",
    "text": "mutation ChangeEmailMutation(\n  $input: ChangeEmailInput!\n) {\n  changeEmail(input: $input) {\n    authPayload {\n      user {\n        email\n        emailConfirmed\n        id\n      }\n    }\n    errors {\n      __typename\n      ... on InvalidTokenError {\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "696639fc15749f76d3044f57de8b555b";

export default node;
