/**
 * @generated SignedSource<<9e28d26e7aa77dd71be978f8d2c545af>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TwoFactorAuthChooseTwoFactorProviderModal_user$data = {
  readonly emailConfirmed: boolean;
  readonly phoneNumberConfirmed: boolean;
  readonly " $fragmentType": "TwoFactorAuthChooseTwoFactorProviderModal_user";
};
export type TwoFactorAuthChooseTwoFactorProviderModal_user = TwoFactorAuthChooseTwoFactorProviderModal_user$data;
export type TwoFactorAuthChooseTwoFactorProviderModal_user$key = {
  readonly " $data"?: TwoFactorAuthChooseTwoFactorProviderModal_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"TwoFactorAuthChooseTwoFactorProviderModal_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TwoFactorAuthChooseTwoFactorProviderModal_user",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "emailConfirmed",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "phoneNumberConfirmed",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "24ad011e945e2da2d58761db88ed83c7";

export default node;
