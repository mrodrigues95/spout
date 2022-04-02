/**
 * @generated SignedSource<<ea3e26db979f66015013cb058cf7e3e8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type UpdateDiscussionDescriptionInput = {
  discussionId: string;
  description?: string | null;
};
export type DescriptionMutation$variables = {
  input: UpdateDiscussionDescriptionInput;
};
export type DescriptionMutationVariables = DescriptionMutation$variables;
export type DescriptionMutation$data = {
  readonly updateDiscussionDescription: {
    readonly discussion: {
      readonly id: string;
      readonly description: string | null;
    } | null;
  };
};
export type DescriptionMutationResponse = DescriptionMutation$data;
export type DescriptionMutation = {
  variables: DescriptionMutationVariables;
  response: DescriptionMutation$data;
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
    "concreteType": "UpdateDiscussionDescriptionPayload",
    "kind": "LinkedField",
    "name": "updateDiscussionDescription",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Discussion",
        "kind": "LinkedField",
        "name": "discussion",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "description",
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
    "name": "DescriptionMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DescriptionMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4d3429f7b85bb488340ab97010c026d6",
    "id": null,
    "metadata": {},
    "name": "DescriptionMutation",
    "operationKind": "mutation",
    "text": "mutation DescriptionMutation(\n  $input: UpdateDiscussionDescriptionInput!\n) {\n  updateDiscussionDescription(input: $input) {\n    discussion {\n      id\n      description\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "70ebcccd219efd63fa0b414edcb7ba3f";

export default node;
