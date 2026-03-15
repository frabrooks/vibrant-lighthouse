import { getRuntimeConfig } from '../app/runtime-config';

const runtimeConfig = getRuntimeConfig({
  apiurl: '',
  cognito: {
    Cognito: {
      userPoolId: '',
      userPoolClientId: ''
    }
  }
});

export const environment = {
  appIdentifier: require('../../package.json').name,
  appVersion: require('../../package.json').version,
  production: true,
  apiurl: runtimeConfig.apiurl,
  cognito: runtimeConfig.cognito
};
