/**
 * @generated SignedSource<<1e32044df7b80bcf70fedad113e85ba9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type GenerateChangePhoneNumberTokenInput = {
  phoneNumber: string;
  countryCode: string;
};
export type useSendPhoneVerificationCodeMutation$variables = {
  input: GenerateChangePhoneNumberTokenInput;
};
export type useSendPhoneVerificationCodeMutationVariables = useSendPhoneVerificationCodeMutation$variables;
export type useSendPhoneVerificationCodeMutation$data = {
  readonly generateChangePhoneNumberToken: {
    readonly errors: ReadonlyArray<{
      readonly __typename: "InvalidPhoneNumberError";
      readonly message: string;
    } | {
      readonly __typename: "SMSNotSentError";
      readonly message: string;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    }> | null;
  };
};
export type useSendPhoneVerificationCodeMutationResponse = useSendPhoneVerificationCodeMutation$data;
export type useSendPhoneVerificationCodeMutation = {
  variables: useSendPhoneVerificationCodeMutationVariables;
  response: useSendPhoneVerificationCodeMutation$data;
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
    "name": "useSendPhoneVerificationCodeMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GenerateChangePhoneNumberTokenPayload",
        "kind": "LinkedField",
        "name": "generateChangePhoneNumberToken",
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
                "type": "InvalidPhoneNumberError",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v4/*: any*/),
                "type": "SMSNotSentError",
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
    "name": "useSendPhoneVerificationCodeMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GenerateChangePhoneNumberTokenPayload",
        "kind": "LinkedField",
        "name": "generateChangePhoneNumberToken",
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
                "type": "InvalidPhoneNumberError",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v5/*: any*/),
                "type": "SMSNotSentError",
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
    "cacheID": "2df38d3f9d0592ae58b59f83d9faf0fd",
    "id": null,
    "metadata": {},
    "name": "useSendPhoneVerificationCodeMutation",
    "operationKind": "mutation",
    "text": "mutation useSendPhoneVerificationCodeMutation(\n  $input: GenerateChangePhoneNumberTokenInput!\n) {\n  generateChangePhoneNumberToken(input: $input) {\n    errors {\n      __typename\n      ... on InvalidPhoneNumberError {\n        __typename\n        message\n      }\n      ... on SMSNotSentError {\n        __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1d37ba8ea7c10117b2c4d6075e0a0444";

export default node;
