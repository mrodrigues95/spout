/**
 * @generated SignedSource<<aa035c29d8737ce3f033237ba228f410>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type UserPreferredProvider = "EMAIL" | "PHONE" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type TwoFactorAuthProviderCard_user$data = {
  readonly preferredProvider: UserPreferredProvider | null;
  readonly twoFactorEnabled: boolean;
  readonly twoFactorEnabledAt: string | null;
  readonly " $fragmentType": "TwoFactorAuthProviderCard_user";
};
export type TwoFactorAuthProviderCard_user = TwoFactorAuthProviderCard_user$data;
export type TwoFactorAuthProviderCard_user$key = {
  readonly " $data"?: TwoFactorAuthProviderCard_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"TwoFactorAuthProviderCard_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TwoFactorAuthProviderCard_user",
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
      "name": "twoFactorEnabledAt",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "64f853deaba8b7971362018e94f4a2f5";

export default node;
