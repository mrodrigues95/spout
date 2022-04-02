/**
 * @generated SignedSource<<7c7b5067d9756986a48429e0c760ae79>>
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
export type useSendPhoneVerificationTokenMutation$variables = {
  input: GenerateChangePhoneNumberTokenInput;
};
export type useSendPhoneVerificationTokenMutationVariables = useSendPhoneVerificationTokenMutation$variables;
export type useSendPhoneVerificationTokenMutation$data = {
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
export type useSendPhoneVerificationTokenMutationResponse = useSendPhoneVerificationTokenMutation$data;
export type useSendPhoneVerificationTokenMutation = {
  variables: useSendPhoneVerificationTokenMutationVariables;
  response: useSendPhoneVerificationTokenMutation$data;
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
    "name": "useSendPhoneVerificationTokenMutation",
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
    "name": "useSendPhoneVerificationTokenMutation",
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
    "cacheID": "879d6242a1d2f8421927df60498317f3",
    "id": null,
    "metadata": {},
    "name": "useSendPhoneVerificationTokenMutation",
    "operationKind": "mutation",
    "text": "mutation useSendPhoneVerificationTokenMutation(\n  $input: GenerateChangePhoneNumberTokenInput!\n) {\n  generateChangePhoneNumberToken(input: $input) {\n    errors {\n      __typename\n      ... on InvalidPhoneNumberError {\n        __typename\n        message\n      }\n      ... on SMSNotSentError {\n        __typename\n        message\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "aeab149f66711204e979490add896a07";

export default node;
