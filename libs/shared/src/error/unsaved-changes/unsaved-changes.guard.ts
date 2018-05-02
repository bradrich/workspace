import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

interface ICanComponentDeactivate {
  checkUnsavedChanges: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class UnsavedChangesGuard implements CanDeactivate<ICanComponentDeactivate> {
  canDeactivate(component: ICanComponentDeactivate) {
    return component.checkUnsavedChanges ? component.checkUnsavedChanges() : true;
  }
}
