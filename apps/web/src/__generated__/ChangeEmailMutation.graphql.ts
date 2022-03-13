/**
 * @generated SignedSource<<1c539fd4df4b40a33d4874369ff8cca4>>
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
            "concreteType": null,
            "kind": "LinkedField",
            "name": "errors",
            "plural": true,
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
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f93800013b8133780fbfccf29634cc15",
    "id": null,
    "metadata": {},
    "name": "ChangeEmailMutation",
    "operationKind": "mutation",
    "text": "mutation ChangeEmailMutation(\n  $input: ChangeEmailInput!\n) {\n  changeEmail(input: $input) {\n    errors {\n      __typename\n      ... on InvalidTokenError {\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2500cf24357ef943e59225cbc08d4bd0";

export default node;
