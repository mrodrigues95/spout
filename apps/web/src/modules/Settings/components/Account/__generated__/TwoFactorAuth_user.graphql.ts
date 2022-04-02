/**
 * @generated SignedSource<<e0467d009ab35d6e7fb5b6f9eac192f3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TwoFactorAuth_user$data = {
  readonly emailConfirmed: boolean;
  readonly phoneNumberConfirmed: boolean;
  readonly twoFactorEnabled: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"TwoFactorAuthChooseTwoFactorProviderModal_user" | "TwoFactorAuthTwoFactorSuccessfullyEnabledModal_user" | "TwoFactorAuthProviderCard_user">;
  readonly " $fragmentType": "TwoFactorAuth_user";
};
export type TwoFactorAuth_user = TwoFactorAuth_user$data;
export type TwoFactorAuth_user$key = {
  readonly " $data"?: TwoFactorAuth_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"TwoFactorAuth_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TwoFactorAuth_user",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "twoFactorEnabled",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TwoFactorAuthChooseTwoFactorProviderModal_user"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TwoFactorAuthTwoFactorSuccessfullyEnabledModal_user"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TwoFactorAuthProviderCard_user"
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "5de78fe779be0234433e2d9576cbc732";

export default node;
