/**
 * @generated SignedSource<<26cb53b58a270626a2443ce6c841474d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RemovePhoneNumber_user$data = {
  readonly " $fragmentSpreads": FragmentRefs<"RemovePhoneNumberVerifyPhoneRemovalModal_user">;
  readonly " $fragmentType": "RemovePhoneNumber_user";
};
export type RemovePhoneNumber_user = RemovePhoneNumber_user$data;
export type RemovePhoneNumber_user$key = {
  readonly " $data"?: RemovePhoneNumber_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"RemovePhoneNumber_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RemovePhoneNumber_user",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RemovePhoneNumberVerifyPhoneRemovalModal_user"
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "1cef3f7a28b78bea92882b8397b5d037";

export default node;
