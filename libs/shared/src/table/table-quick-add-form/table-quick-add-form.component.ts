import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { TableColumn } from '../table-column.model';

@Component({
  selector: 'sf-table-quick-add-form',
  templateUrl: './table-quick-add-form.component.html'
})
export class TableQuickAddFormComponent implements OnInit, OnChanges {
  @Input() config: any;

  @Input() quickAddModel: any;
  @Input()
  get isQuickAddSaving(): boolean {
    return this._isQuickAddSaving;
  }
  set isQuickAddSaving(v) {
    this._isQuickAddSaving = coerceBooleanProperty(v);
  }
  @Output() quickAddSave = new EventEmitter<any>();

  showQuickAddForm = false;
  form: FormGroup;

  private _isQuickAddSaving = false;

  constructor(private formBuilder: FormBuilder) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.setForm();
  }

  /**
   * OnChanges life-cycle method.
   * @param {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (
        (key === 'isQuickAddSaving' &&
          changes[key].currentValue === false &&
          changes[key].previousValue === true) ||
        key === 'quickAddModel'
      ) {
        this.cancel();
      }
    }
  }

  /**
   * Builds the quick add form.
   */
  setForm() {
    if (this.config.quickAdd && !this.quickAddModel) {
      throw new Error(`
        TableQuickAddComponent: The quick add form model has not been provided.
      `);
    }

    if (this.quickAddModel && this.config.quickAdd) {
      const formGroup = {};
      let formControl: FormControl;
      Object.keys(this.quickAddModel).forEach((key) => {
        formControl = new FormControl(this.quickAddModel[key]);
        formGroup[key] = formControl;
      });

      this.form = this.formBuilder.group(formGroup);

      this.showQuickAddForm = true;
    }
  }

  /**
   * Shows the text input.
   * @param {TableColumn} column
   * @returns {boolean}
   */
  showTextInput(column: TableColumn): boolean {
    const options = column.quickAddFormOptions || {};

    return (
      (column.type === 'text' || column.type === 'link') &&
      !options.hide &&
      (!options.type || options.type === 'input')
    );
  }

  /**
   * Show the select input.
   * @param {TableColumn} column
   * @returns {boolean}
   */
  showSelectInput(column: TableColumn): boolean {
    const options = column.quickAddFormOptions || {};

    return (
      (column.type === 'text' || column.type === 'header' || column.type === 'link') &&
      !options.hide &&
      options.type === 'select'
    );
  }

  /**
   * Calls the onQuickAddSave output binding.
   */
  save() {
    const obj = {};
    Object.keys(this.quickAddModel).forEach((key) => {
      obj[key] = this.form.get(key).value;
    });
    this.quickAddModel = Object.assign(this.quickAddModel, obj);

    this.quickAddSave.emit(this.quickAddModel);
  }

  /**
   * Resets the form.
   */
  cancel() {
    if (this.form) {
      const obj = Object.assign({}, this.quickAddModel);
      this.form.reset(obj);
    }
  }
}
