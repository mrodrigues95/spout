/**
 * @generated SignedSource<<4366dce9616cfd20e1f2cc2b3e1352c5>>
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
export type SettingsHeaderMutation$variables = {
  input: LogoutInput;
};
export type SettingsHeaderMutationVariables = SettingsHeaderMutation$variables;
export type SettingsHeaderMutation$data = {
  readonly logout: {
    readonly authPayload: {
      readonly isLoggedIn: boolean;
    } | null;
  };
};
export type SettingsHeaderMutationResponse = SettingsHeaderMutation$data;
export type SettingsHeaderMutation = {
  variables: SettingsHeaderMutationVariables;
  response: SettingsHeaderMutation$data;
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
    "name": "SettingsHeaderMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SettingsHeaderMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "978aeea29cb0d57c4c5b3e2fa6c2d588",
    "id": null,
    "metadata": {},
    "name": "SettingsHeaderMutation",
    "operationKind": "mutation",
    "text": "mutation SettingsHeaderMutation(\n  $input: LogoutInput!\n) {\n  logout(input: $input) {\n    authPayload {\n      isLoggedIn\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6debb19dc2217358224b8378eba19d78";

export default node;
