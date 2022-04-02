/**
 * @generated SignedSource<<fe598a0398101f9151f9b330f80ceb48>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type UserPreferredProvider = "EMAIL" | "PHONE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type TwoFactorAuthTwoFactorSuccessfullyEnabledModal_user$data = {
  readonly email: string;
  readonly phoneNumber: string | null;
  readonly preferredProvider: UserPreferredProvider | null;
  readonly " $fragmentType": "TwoFactorAuthTwoFactorSuccessfullyEnabledModal_user";
};
export type TwoFactorAuthTwoFactorSuccessfullyEnabledModal_user = TwoFactorAuthTwoFactorSuccessfullyEnabledModal_user$data;
export type TwoFactorAuthTwoFactorSuccessfullyEnabledModal_user$key = {
  readonly " $data"?: TwoFactorAuthTwoFactorSuccessfullyEnabledModal_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"TwoFactorAuthTwoFactorSuccessfullyEnabledModal_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TwoFactorAuthTwoFactorSuccessfullyEnabledModal_user",
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
      "name": "phoneNumber",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "preferredProvider",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "1a9a170df0224c0f1423976425a808a2";

export default node;
