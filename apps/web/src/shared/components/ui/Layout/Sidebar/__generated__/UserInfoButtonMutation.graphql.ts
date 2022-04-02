/**
 * @generated SignedSource<<3e6a19b86a029f4f4189909347ed8853>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type LogoutInput = {
  sessionId: string;
};
export type UserInfoButtonMutation$variables = {
  input: LogoutInput;
};
export type UserInfoButtonMutationVariables = UserInfoButtonMutation$variables;
export type UserInfoButtonMutation$data = {
  readonly logout: {
    readonly authPayload: {
      readonly isLoggedIn: boolean;
    } | null;
  };
};
export type UserInfoButtonMutationResponse = UserInfoButtonMutation$data;
export type UserInfoButtonMutation = {
  variables: UserInfoButtonMutationVariables;
  response: UserInfoButtonMutation$data;
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
    "concreteType": "LogoutPayload",
    "kind": "LinkedField",
    "name": "logout",
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
    "name": "UserInfoButtonMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserInfoButtonMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b5ca9e7db9a12285e255e57792f2f543",
    "id": null,
    "metadata": {},
    "name": "UserInfoButtonMutation",
    "operationKind": "mutation",
    "text": "mutation UserInfoButtonMutation(\n  $input: LogoutInput!\n) {\n  logout(input: $input) {\n    authPayload {\n      isLoggedIn\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "316021b675d4627aecdc4aa43fb73438";

export default node;
