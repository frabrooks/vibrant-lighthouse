import { getRuntimeConfig } from '../app/runtime-config';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const runtimeConfig = getRuntimeConfig({
  apiurl: 'http://localhost:8000',
  cognito: {
    Cognito: {
      userPoolId: 'SET IN LOCAL',
      userPoolClientId: 'SET IN LOCAL'
    }
  }
});

export const environment = {
  appIdentifier: require('../../package.json').name,
  appVersion: require('../../package.json').version,
  production: false,
  apiurl: runtimeConfig.apiurl,
  cognito: runtimeConfig.cognito
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
