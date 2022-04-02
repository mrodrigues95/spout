/**
 * @generated SignedSource<<c8baf02dc518c7a30277e978a2229d5f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type GeneratePasswordResetTokenInput = {
  email: string;
};
export type ForgotPasswordMutation$variables = {
  input: GeneratePasswordResetTokenInput;
};
export type ForgotPasswordMutationVariables = ForgotPasswordMutation$variables;
export type ForgotPasswordMutation$data = {
  readonly generatePasswordResetToken: {
    readonly authPayload: {
      readonly isLoggedIn: boolean;
    } | null;
  };
};
export type ForgotPasswordMutationResponse = ForgotPasswordMutation$data;
export type ForgotPasswordMutation = {
  variables: ForgotPasswordMutationVariables;
  response: ForgotPasswordMutation$data;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "GeneratePasswordResetTokenPayload",
    "kind": "LinkedField",
    "name": "generatePasswordResetToken",
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
            "kind": "ScalarField",
            "name": "isLoggedIn",
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
    "name": "ForgotPasswordMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ForgotPasswordMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "fe2880cdd67cf2484f5c0be1bc5cec4e",
    "id": null,
    "metadata": {},
    "name": "ForgotPasswordMutation",
    "operationKind": "mutation",
    "text": "mutation ForgotPasswordMutation(\n  $input: GeneratePasswordResetTokenInput!\n) {\n  generatePasswordResetToken(input: $input) {\n    authPayload {\n      isLoggedIn\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "25af0fbffb00796111b000d1ff71156e";

export default node;
