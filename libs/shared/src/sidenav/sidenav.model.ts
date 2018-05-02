import { Observable } from 'rxjs/Observable';

export interface Sidenav {
  sections: SidenavSection[];
  accountSections?: SidenavSection[];
  signInSections?: SidenavSection[];
}

export interface SidenavSection {
  name?: Observable<string> | string;
  type?: 'link' | 'function' | 'toggle';
  route?: string;
  func?: (...args: any[]) => any;
  isHidden?: Observable<boolean> | boolean;
  isAccount?: boolean;
  icon?: string;
  toggleIcon?: string;
  pages?: SidenavSection[];
}
