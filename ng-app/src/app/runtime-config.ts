type RuntimeConfigDefaults = {
  apiurl: string;
  cognito: {
    Cognito: {
      userPoolId: string;
      userPoolClientId: string;
    };
  };
};

type RuntimeConfigOverrides = {
  apiurl?: string;
  cognito?: {
    Cognito?: {
      userPoolId?: string;
      userPoolClientId?: string;
    };
  };
};

declare global {
  interface Window {
    __QUAD_TODO_CONFIG__?: RuntimeConfigOverrides;
  }
}

const runtimeConfig: RuntimeConfigOverrides =
  typeof window === 'undefined' ? {} : window.__QUAD_TODO_CONFIG__ ?? {};

export function getRuntimeConfig(defaults: RuntimeConfigDefaults): RuntimeConfigDefaults {
  return {
    apiurl: runtimeConfig.apiurl ?? defaults.apiurl,
    cognito: {
      Cognito: {
        userPoolId:
          runtimeConfig.cognito?.Cognito?.userPoolId ??
          defaults.cognito.Cognito.userPoolId,
        userPoolClientId:
          runtimeConfig.cognito?.Cognito?.userPoolClientId ??
          defaults.cognito.Cognito.userPoolClientId,
      },
    },
  };
}
