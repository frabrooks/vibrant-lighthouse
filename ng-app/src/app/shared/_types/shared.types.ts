import { InjectionToken } from "@angular/core";


export const BREAKPOINTS_TOKEN = new InjectionToken<Breakpoints>('BREAKPOINTS');

export interface Breakpoints {
  convertToRem: boolean;
  mobileFirst: boolean;
  breakpoints: Map<string, number>;
}
