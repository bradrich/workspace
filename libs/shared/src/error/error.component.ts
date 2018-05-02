import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'sf-error',
  template: `
    <div class="d-flex flex-column justify-content-center align-items-center h-100">
      <div>

        <div class="sf-image sf-zoom-in">
          <img [src]="assets.image" alt="Error" />
        </div>

        <h6 class="mt-1 sf-fade-in-up">{{title}}</h6>

        <p class="sf-fade-in-up">{{message}}</p>

        <button class="btn btn-primary sf-fade-in-up" (click)="refresh.emit()" *ngIf="showRefresh">
          Refresh
        </button>

      </div>
    </div>
  `
})
export class ErrorComponent implements OnInit {
  @Input() title = 'Error';
  @Input() message = 'An error occurred while making your request.';

  @Input()
  get showRefresh(): boolean {
    return this._showRefresh;
  }
  set showRefresh(v) {
    this._showRefresh = coerceBooleanProperty(v);
  }
  @Output() refresh = new EventEmitter<any>();

  assets: any;

  private _showRefresh = true;

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.assets = {
      image: null
    };
  }
}
