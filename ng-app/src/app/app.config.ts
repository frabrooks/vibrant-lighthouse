import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";

import { APP_NGRX_CONFIG } from "./app.provider.ngrx";
import { routes } from "./app.routes";
import { BREAKPOINTS_TOKEN } from "./shared/_types/shared.types";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: BREAKPOINTS_TOKEN,
      useValue: {
        convertToRem: true,
        mobileFirst: false,
        breakpoints: new Map([
          ['xs', 0],
          ['sm', 576],
          ['md', 768],
          ['lg', 992],
          ['xl', 1200],
          ['xxl', 1400],
        ]),
      }
    },
    ...APP_NGRX_CONFIG
  ],
};

