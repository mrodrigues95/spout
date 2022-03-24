/**
 * @generated SignedSource<<3ead4893ec4a2fbe5e65efeddd112164>>
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
export type PhoneVerificationInputMutation$variables = {
  input: GenerateChangePhoneNumberTokenInput;
};
export type PhoneVerificationInputMutationVariables = PhoneVerificationInputMutation$variables;
export type PhoneVerificationInputMutation$data = {
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
export type PhoneVerificationInputMutationResponse = PhoneVerificationInputMutation$data;
export type PhoneVerificationInputMutation = {
  variables: PhoneVerificationInputMutationVariables;
  response: PhoneVerificationInputMutation$data;
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
    "name": "PhoneVerificationInputMutation",
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
    "name": "PhoneVerificationInputMutation",
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
    "cacheID": "e725b882dac1230ee323d94704a41f83",
    "id": null,
    "metadata": {},
    "name": "PhoneVerificationInputMutation",
    "operationKind": "mutation",
    "text": "mutation PhoneVerificationInputMutation(\n  $input: GenerateChangePhoneNumberTokenInput!\n) {\n  generateChangePhoneNumberToken(input: $input) {\n    errors {\n      __typename\n      ... on InvalidPhoneNumberError {\n        __typename\n        message\n      }\n      ... on SMSNotSentError {\n        __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b455551868ee563b85faef8fbb02726e";

export default node;
