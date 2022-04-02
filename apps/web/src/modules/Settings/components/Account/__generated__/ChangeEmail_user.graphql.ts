/**
 * @generated SignedSource<<0c5c10a4a3e5f621b3917bac1a8ad3bc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeEmail_user$data = {
  readonly email: string;
  readonly emailConfirmed: boolean;
  readonly " $fragmentType": "ChangeEmail_user";
};
export type ChangeEmail_user = ChangeEmail_user$data;
export type ChangeEmail_user$key = {
  readonly " $data"?: ChangeEmail_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeEmail_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeEmail_user",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "email",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "emailConfirmed",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "1bb9ebd1cb981702ec910ac1af7429a7";

export default node;
