import 'rxjs/add/operator/debounceTime';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ResponsiveService {
  private window = new BehaviorSubject<any>(null);

  constructor() {
    this.setWindow(window);
    window.onresize = (e) => {
      this.setWindow(e.target);
    };
  }

  /**
   * Sets the `window`.
   * @param {*} val
   */
  setWindow(val: any) {
    this.window.next(val);
  }

  /**
   * Gets the `window` as an observable.
   * @returns {Observable<any>}
   */
  getWindow(): Observable<any> {
    return this.window.asObservable().debounceTime(200);
  }
}
