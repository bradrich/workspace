import { IConstants } from '@swampfox/shared';

import { version } from '../environments/version.constants';

export const appConstants: IConstants = {
  appAbbreviation: 'FIL',
  appApiUri: 'http://localhost:8080/',
  appColors: ['#9c182f', '#e5546d', '#6a98c5', '#222222', '#ec8f21'],
  appCustomerName: 'Customer',
  appDefaultLangKey: 'en',
  appLandingRoute: '/dashboard',
  appLogoImage: '',
  appName: 'First In Line',
  appVersion: version.version
};
