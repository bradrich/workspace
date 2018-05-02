import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'sf-no-results',
  template: `
    <div class="sf-image sf-zoom-in">
      <img [src]="assets.image" alt="Error" />
    </div>

    <h6 class="mt-1 sf-fade-in-up">{{title}}</h6>

    <p class="sf-fade-in-up">
      {{message}}
      <span *ngIf="showCreateEntity">or</span>
    </p>

    <button
      class="btn btn-primary sf-fade-in-up"
      (click)="createEntity.emit()"
      *ngIf="showCreateEntity">
      Create entity
    </button>
  `,
  styles: []
})
export class NoResultsComponent implements OnInit {
  @Input() title = 'No Results';
  @Input() message = 'Try adjusting your search or filter to find what you are looking for';

  @Input()
  get showCreateEntity(): boolean {
    return this._showCreateEntity;
  }
  set showCreateEntity(v) {
    this._showCreateEntity = coerceBooleanProperty(v);
  }
  @Output() createEntity = new EventEmitter<any>();

  assets: any;

  private _showCreateEntity = false;

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.assets = {
      image: null
    };
  }
}
