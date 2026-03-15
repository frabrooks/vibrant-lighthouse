import { ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import { environment } from 'src/environments/environment';

function browserStorageEnabled(): boolean {
  try {
    const key = '__storage_test__';
    localStorage.setItem(key, key);
    localStorage.removeItem(key);
    return true;
  }
  catch (e) {
    return false;
  }
}

function checkAppVersion(): void {
  const appIdentifier = environment.appIdentifier;
  const version: string = environment.appVersion;

  if (localStorage.getItem(appIdentifier) !== version) {
    localStorage.clear();
    localStorage.setItem(appIdentifier, version);
  }
}

export function browserLocalStorageSync<T>(reducer: ActionReducer<T>, keys: string[] = []): ActionReducer<T> {
  if (browserStorageEnabled()) {
    checkAppVersion();
    return localStorageSync({
      keys,
      rehydrate: true
    })(reducer);
  } else {
    return reducer;
  }
}


