import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ZXCVBNResult } from 'zxcvbn';

import { passwordStrengthPolicyMessage } from './password-strength.constants';
import { PasswordStrengthService } from './password-strength.service';

@Component({
  selector: 'sf-password-strength',
  template: `
    <div
      class="sf-password-strength-meter"
      [ngbPopover]="policyMessage"
      placement="left"
      triggers="mouseenter:mouseleave">
      <div
        *ngFor="let point of points | reverse"
        [ngClass]="['point', 'level' + point.level]">
      </div>
    </div>
  `,
  styleUrls: ['./password-strength.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PasswordStrengthComponent implements OnInit, OnDestroy {
  isVisible = false;
  policyMessage = passwordStrengthPolicyMessage;
  points = [{ level: 0 }, { level: 0 }, { level: 0 }, { level: 0 }];

  private onDestroy = new Subject();

  constructor(private passwordStrengthService: PasswordStrengthService) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.passwordStrengthService
      .getTestResult()
      .takeUntil(this.onDestroy)
      .subscribe((testResult: ZXCVBNResult) => {
        if (testResult) {
          this.isVisible = true;

          this.points.forEach((point: any, index: number) => {
            index++;
            if (index <= testResult.score) {
              point.level = testResult.score;
            } else {
              point.level = 0;
            }
          });
        } else {
          this.isVisible = false;
        }
      });
  }

  /**
   * OnDestroy life-cycle method.
   */
  ngOnDestroy() {
    this.onDestroy.next();
  }
}
