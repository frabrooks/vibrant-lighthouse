import { EnvironmentProviders } from "@angular/core";
import { provideEffects } from "@ngrx/effects";
import { provideRouterStore } from "@ngrx/router-store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { provideStore } from "@ngrx/store";

import { environment } from "src/environments/environment";
import { reducers, metaReducers } from "./app.state";
import { CoreEffects } from "./store/core.effects";
import { AuthEffects } from "./features/auth/store/auth.effects";


export const APP_NGRX_CONFIG: EnvironmentProviders[] = [
  provideStore(reducers, { metaReducers }),
  provideEffects([
    CoreEffects,
    AuthEffects
  ]),
  provideRouterStore(),
  provideStoreDevtools({
    name: "Quad Todo v.1.0.0",
    logOnly: environment.production
  }),
];

