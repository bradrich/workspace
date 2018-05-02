import { Observable } from 'rxjs/Observable';

export interface TableQuickAddFormOptions {
  hide?: boolean;
  controlOverride?: string;
  required?: boolean;
  type?: 'input' | 'select';
  inputType?: 'text' | 'number' | 'password';
  inputPattern?: any;
  inputMin?: number;
  inputMax?: number;
  selectIsObservable?: boolean;
  selectSearch?: (...args: any[]) => any;
  selectOptions?: string[] | Observable<any[]>;
  selectValueOverride?: (...args: any[]) => any;
  selectLabelOverride?: (...args: any[]) => any;
}
