/**
 * @generated SignedSource<<18a3d4d90a19e664fa5b51a255b1d7ed>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type UserPreferredProvider = "EMAIL" | "PHONE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type RemovePhoneNumberVerifyPhoneRemovalModal_user$data = {
  readonly preferredProvider: UserPreferredProvider | null;
  readonly twoFactorEnabled: boolean;
  readonly phoneNumber: string | null;
  readonly " $fragmentType": "RemovePhoneNumberVerifyPhoneRemovalModal_user";
};
export type RemovePhoneNumberVerifyPhoneRemovalModal_user = RemovePhoneNumberVerifyPhoneRemovalModal_user$data;
export type RemovePhoneNumberVerifyPhoneRemovalModal_user$key = {
  readonly " $data"?: RemovePhoneNumberVerifyPhoneRemovalModal_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"RemovePhoneNumberVerifyPhoneRemovalModal_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RemovePhoneNumberVerifyPhoneRemovalModal_user",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "preferredProvider",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "twoFactorEnabled",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "phoneNumber",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "3e47b7342b4640e61aeb71473175c5a9";

export default node;
