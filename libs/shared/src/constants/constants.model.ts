import { InjectionToken } from '@angular/core';

export const CONSTANTS_TOKEN = new InjectionToken('CONSTANTS_TOKEN');

export interface IConstants {
  appAbbreviation?: string;
  appApiUri?: string;
  appColors?: string[];
  appCustomerName?: string;
  appDefaultLangKey?: string;
  appLandingRoute?: string;
  appLogoImage?: string;
  appName?: string;
  appVersion?: string;
}

export class Constants {
  appAbbreviation?: string;
  appApiUri?: string;
  appColors?: string[];
  appCustomerName?: string;
  appDefaultLangKey?: string;
  appLandingRoute?: string;
  appLogoImage?: string;
  appName?: string;
  appVersion?: string;

  constructor(obj?: IConstants) {
    this.appAbbreviation = obj && obj.appAbbreviation ? obj.appAbbreviation : null;
    this.appApiUri = obj && obj.appApiUri ? obj.appApiUri : null;
    this.appColors = obj && obj.appColors ? obj.appColors : [];
    this.appCustomerName = obj && obj.appCustomerName ? obj.appCustomerName : null;
    this.appDefaultLangKey = obj && obj.appDefaultLangKey ? obj.appDefaultLangKey : null;
    this.appLandingRoute = obj && obj.appLandingRoute ? obj.appLandingRoute : null;
    this.appLandingRoute = obj && obj.appLandingRoute ? obj.appLandingRoute : null;
    this.appLogoImage = obj && obj.appLogoImage ? obj.appLogoImage : null;
    this.appName = obj && obj.appName ? obj.appName : null;
    this.appVersion = obj && obj.appVersion ? obj.appVersion : null;
  }
}

export function provideConstants(constants: IConstants): Constants {
  return new Constants(constants);
}
