/**
 * @generated SignedSource<<d5575871a3874fc9c3859be548c58220>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangePhoneNumber_user$data = {
  readonly phoneNumber: string | null;
  readonly phoneNumberConfirmed: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"RemovePhoneNumber_user">;
  readonly " $fragmentType": "ChangePhoneNumber_user";
};
export type ChangePhoneNumber_user = ChangePhoneNumber_user$data;
export type ChangePhoneNumber_user$key = {
  readonly " $data"?: ChangePhoneNumber_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangePhoneNumber_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangePhoneNumber_user",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "phoneNumber",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "phoneNumberConfirmed",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RemovePhoneNumber_user"
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "092788c9e4ba3723bce958380e8e220a";

export default node;
