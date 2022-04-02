/**
 * @generated SignedSource<<b95f74af319177b5272496c57aa247cf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type useResendVerificationEmailMutation$variables = {};
export type useResendVerificationEmailMutationVariables = useResendVerificationEmailMutation$variables;
export type useResendVerificationEmailMutation$data = {
  readonly generateEmailVerificationToken: {
    readonly authPayload: {
      readonly isLoggedIn: boolean;
    } | null;
  };
};
export type useResendVerificationEmailMutationResponse = useResendVerificationEmailMutation$data;
export type useResendVerificationEmailMutation = {
  variables: useResendVerificationEmailMutationVariables;
  response: useResendVerificationEmailMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "GenerateEmailVerificationTokenPayload",
    "kind": "LinkedField",
    "name": "generateEmailVerificationToken",
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "useResendVerificationEmailMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "useResendVerificationEmailMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "36dba8e6c1595798452d46b56aa9977d",
    "id": null,
    "metadata": {},
    "name": "useResendVerificationEmailMutation",
    "operationKind": "mutation",
    "text": "mutation useResendVerificationEmailMutation {\n  generateEmailVerificationToken {\n    authPayload {\n      isLoggedIn\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0ec1d607241a29175668c4644425c725";

export default node;
