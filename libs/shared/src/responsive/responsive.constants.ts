import { BreakPoint, DEFAULT_BREAKPOINTS } from '@angular/flex-layout';
import { IResponsiveConfig, ResponsiveConfig } from 'ngx-responsive';

export const xs = { max: 575 };
export const sm = { min: 576, max: 767 };
export const md = { min: 768, max: 991 };
export const lg = { min: 992, max: 1199 };
export const xl = { min: 1200 };

function BreakpointCustom(breakpoint: BreakPoint) {
  switch (breakpoint.alias) {
    case 'xs':
      breakpoint.mediaQuery = `(max-width: ${xs.max}px)`;
      break;
    case 'sm':
      breakpoint.mediaQuery = `(min-width: ${sm.min}px) and (max-width: ${sm.max}px)`;
      break;
    case 'md':
      breakpoint.mediaQuery = `(min-width: ${md.min}px) and (max-width: ${md.max}px)`;
      break;
    case 'lg':
      breakpoint.mediaQuery = `(min-width: ${lg.min}px) and (max-width: ${lg.max}px)`;
      break;
    case 'xl':
      breakpoint.mediaQuery = `(min-width: ${xl.min}px)`;
      break;
  }

  return breakpoint;
}

export function BreakpointConfig() {
  return DEFAULT_BREAKPOINTS.map(BreakpointCustom);
}

export const responsiveConfig: IResponsiveConfig = {
  breakPoints: {
    xs: xs,
    sm: sm,
    md: md,
    lg: lg,
    xl: xl
  },
  debounceTime: 100
};

export function ResponsiveDefinition() {
  return new ResponsiveConfig(responsiveConfig);
}
