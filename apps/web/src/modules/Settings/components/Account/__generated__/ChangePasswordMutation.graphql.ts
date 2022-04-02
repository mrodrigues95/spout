/**
 * @generated SignedSource<<c8145ee675ceb81941e77e3685628d44>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ChangePasswordInput = {
  sessionId: string;
  currentPassword: string;
  newPassword: string;
};
export type ChangePasswordMutation$variables = {
  input: ChangePasswordInput;
};
export type ChangePasswordMutationVariables = ChangePasswordMutation$variables;
export type ChangePasswordMutation$data = {
  readonly changePassword: {
    readonly errors: ReadonlyArray<{
      readonly __typename: "IncorrectCurrentPasswordError";
      readonly message: string;
    } | {
      readonly __typename: "SessionExpiredError";
      readonly message: string;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    }> | null;
  };
};
export type ChangePasswordMutationResponse = ChangePasswordMutation$data;
export type ChangePasswordMutation = {
  variables: ChangePasswordMutationVariables;
  response: ChangePasswordMutation$data;
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
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "message",
  "storageKey": null
},
v4 = [
  (v2/*: any*/),
  (v3/*: any*/)
],
v5 = [
  (v3/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChangePasswordMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ChangePasswordPayload",
        "kind": "LinkedField",
        "name": "changePassword",
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
                "kind": "InlineFragment",
                "selections": (v4/*: any*/),
                "type": "IncorrectCurrentPasswordError",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v4/*: any*/),
                "type": "SessionExpiredError",
                "abstractKey": null
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
    "name": "ChangePasswordMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ChangePasswordPayload",
        "kind": "LinkedField",
        "name": "changePassword",
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
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v5/*: any*/),
                "type": "IncorrectCurrentPasswordError",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v5/*: any*/),
                "type": "SessionExpiredError",
                "abstractKey": null
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
    "cacheID": "7ee2b944e431f83f6f8b442425b4a6d2",
    "id": null,
    "metadata": {},
    "name": "ChangePasswordMutation",
    "operationKind": "mutation",
    "text": "mutation ChangePasswordMutation(\n  $input: ChangePasswordInput!\n) {\n  changePassword(input: $input) {\n    errors {\n      __typename\n      ... on IncorrectCurrentPasswordError {\n        __typename\n        message\n      }\n      ... on SessionExpiredError {\n        __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8a2847d4f6472589bd013009e77d4b27";

export default node;
