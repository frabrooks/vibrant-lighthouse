import { ActionReducer } from "@ngrx/store";

import * as fromCore from "@core";
import * as fromAuth from "@features/auth/store";

import { ApplicationState } from "../../app.state";
import { browserLocalStorageSync } from "./browser-storage.metareducer";

function localStorageMetaReducer(reducer: ActionReducer<ApplicationState>): ActionReducer<ApplicationState> {
  return browserLocalStorageSync(reducer, [ fromCore.featureKey, fromAuth.featureKey ]);
}

export const metaReducers = [localStorageMetaReducer];
