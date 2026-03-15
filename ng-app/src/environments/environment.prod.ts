export const environment = {
  appIdentifier: require('../../package.json').name,
  appVersion: require('../../package.json').version,
  production: true,
  apiurl: 'https://api.eisentodo.com',
  cognito: {
    Cognito: {
      userPoolId: 'eu-west-2_6I00asBfu',
      userPoolClientId: '5emadr5f2c5e6kdsel3pljml5o'
    }
  }
};
