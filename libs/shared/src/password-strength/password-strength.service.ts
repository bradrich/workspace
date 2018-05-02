import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as zxcvbn from 'zxcvbn';
import { ZXCVBNResult } from 'zxcvbn';

@Injectable()
export class PasswordStrengthService {
  private testResult = new BehaviorSubject<ZXCVBNResult>(null);

  /**
   * Tests the password using Dropbox's `zxcvbn` strength service. To learn more about `zxcvbn`,
   * please read https://github.com/dropbox/zxcvbn.
   * @param {string} password
   */
  setTestResult(password: string) {
    if (password) {
      this.testResult.next(zxcvbn(password));
    }
  }

  /**
   * Gets `testResult` as an observable.
   * @returns {Observable<ZXCVBNResult>}
   */
  getTestResult(): Observable<ZXCVBNResult> {
    return this.testResult.asObservable();
  }

  /**
   * Gets `testResult` directly.
   * @returns {*}
   */
  getTestResultDirectly(): ZXCVBNResult {
    return this.testResult.getValue();
  }
}
