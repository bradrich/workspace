import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import {
  authRoleAdmin,
  authRoleUser,
  authSelectors,
  Register,
  State as AuthState
} from '@swampfox/auth';
import { SfValidators, UnsavedChangesService, UtilityService } from '@swampfox/shared';
import { Subject } from 'rxjs/Subject';

import { adminSelectors, State as AdminState } from '../reducers';
import { UserUpdate } from './state/user.actions';
import { userIsMultipleInfoMessage } from './user.constants';
import { User } from './user.model';

@Component({
  selector: 'sf-user-edit',
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit, OnChanges, OnDestroy {
  @Input() users: User[] = [];
  @Input() currentUser: User;

  @Output() requestUserListRefresh = new EventEmitter<any>();
  @Output() cancelEdit = new EventEmitter<any>();
  @Output() deleteUsers = new EventEmitter<any>();

  isLoading = false;
  user: User;

  isMultiple = false;
  isMultipleInfoMessage = userIsMultipleInfoMessage;
  form: FormGroup;
  authorities = [authRoleAdmin, authRoleUser];
  isSaving = false;

  registerPending$ = this.authStore.pipe(select(authSelectors.getRegisterPending));
  registerSuccess$ = this.authStore.pipe(select(authSelectors.getRegisterSuccess));
  registerError$ = this.authStore.pipe(select(authSelectors.getRegisterError));

  userPending$ = this.adminStore.pipe(select(adminSelectors.getUserPending));
  userSuccess$ = this.adminStore.pipe(select(adminSelectors.getUserSuccess));
  userError$ = this.adminStore.pipe(select(adminSelectors.getUserError));

  private onDestroy = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private authStore: Store<AuthState>,
    private unsavedChangesService: UnsavedChangesService,
    private utilityService: UtilityService,
    private adminStore: Store<AdminState>
  ) {}

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.watchSuccess();
  }

  /**
   * OnChanges life-cycle method.
   * @param {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (key === 'users' && changes[key]) {
        this.isLoading = true;

        this.setUser().then(() => {
          this.setForm();
          this.isLoading = false;
        });
      }
    }
  }

  /**
   * OnDestroy life-cycle method.
   */
  ngOnDestroy() {
    this.onDestroy.next();
    this.checkUnsavedChanges();
  }

  /**
   * Cancels the form after successful save.
   */
  watchSuccess() {
    const onSuccess = (success: boolean) => {
      if (success && this.form && !this.isSaving) {
        this.cancel();
      }
    };

    this.registerSuccess$.takeUntil(this.onDestroy).subscribe((success: boolean) => {
      onSuccess(success);
    });
    this.userSuccess$.takeUntil(this.onDestroy).subscribe((success: boolean) => {
      onSuccess(success);
    });
  }

  /**
   * Sets the user from the users array that was passed in from the `UserComponent`.
   * @returns {Promise<any>}
   */
  setUser(): Promise<any> {
    if (this.users && this.users.length > 1) {
      this.isMultiple = true;
      return this.setUserFromMultiple().then();
    } else {
      this.isMultiple = false;

      const user = this.users[0];

      this.user = new User(user);

      return Promise.resolve(true);
    }
  }

  /**
   * Sets `user` based off of commonalities of multiple users.
   * @returns {Promise<any>}
   */
  setUserFromMultiple(): Promise<any> {
    const obj = {
      activated: [],
      authorities: []
    };

    const objConverted = this.utilityService.convertEntityArrayToCommonEntityObject(
      obj,
      this.users
    );

    const objFinal = {
      activated: objConverted.activated[0] === 'true',
      authorities: objConverted.authorities[0].split(',')
    };

    this.user = new User(objFinal);

    return Promise.resolve(true);
  }

  /**
   * Sets `form`.
   */
  setForm() {
    this.form = this.formBuilder.group({
      login: new FormControl({
        value: this.user.login,
        disabled: this.user.login === this.currentUser.login
      }),
      activated: new FormControl(
        {
          value: this.user.activated,
          disabled:
            this.user.login === this.currentUser.login || (!this.user.id && !this.isMultiple)
        },
        [Validators.required]
      ),
      firstName: new FormControl(this.user.firstName),
      lastName: new FormControl(this.user.lastName),
      password: new FormControl({
        value: this.user.password,
        disabled: true
      }),
      email: new FormControl(this.user.email),
      langKey: new FormControl(this.user.langKey),
      authorities: new FormControl(
        {
          value: this.user.authorities,
          disabled: this.user.login === this.currentUser.login
        },
        [Validators.required]
      )
    });

    if (!this.isMultiple) {
      this.form
        .get('login')
        .setValidators([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
          SfValidators.pattern(/^[_'.@A-Za-z0-9-]*$/, `_'.@A-Za-z0-9-`)
        ]);
      this.form.get('firstName').setValidators([Validators.required, Validators.maxLength(50)]);
      this.form.get('lastName').setValidators([Validators.required, Validators.maxLength(50)]);
      this.form.get('password').setValidators([Validators.required]);
      this.form
        .get('email')
        .setValidators([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          SfValidators.email
        ]);
      this.form.get('langKey').setValidators([Validators.required]);
    }
  }

  /**
   * Gets the user authority chip color based off of the authority value.
   * @param {string} authority
   * @returns {string}
   */
  getUserAuthorityChipColor(authority: string): string {
    return authority === authRoleAdmin ? 'success' : 'info';
  }

  /**
   * Adds or removes the selected authority from the authorities form input.
   * @param {string} authority
   */
  userAuthoritySelectionChange(authority: string) {
    const selected = this.form.get('authorities').value;
    const newSelected = this.form.get('authorities').value.filter((a: string) => a !== authority);

    if (newSelected.length === selected.length) {
      newSelected.push(authority);
    }

    this.form.get('authorities').setValue(newSelected);

    this.form.markAsDirty();
    this.form.markAsTouched();
  }

  /**
   * Updates the users or registers a new one depending on if this is an edit or a create.
   */
  submit() {
    const user = new User(Object.assign({}, this.user, this.form.value));
    const action = this.isMultiple ? 'update' : this.user.id ? 'update' : 'save';
    const store = action === 'save' ? 'authStore' : 'adminStore';

    if (this.isMultiple) {
      this.isSaving = true;

      this.users.forEach((u: User, index: number) => {
        u.activated = user.activated;
        u.authorities = user.authorities;

        this.adminStore.dispatch(new UserUpdate(u));

        if (index === this.users.length - 1) {
          this.isSaving = false;
        }
      });
    } else if (store === 'authStore') {
      this.authStore.dispatch(new Register(user));
    } else {
      this.adminStore.dispatch(new UserUpdate(user));
    }
  }

  /**
   * Resets the form.
   */
  cancel() {
    this.form.reset(this.user);
  }

  /**
   * Allows the account to cancel their changes to their settings and leave the page.
   * @returns {(Promise<boolean> | boolean)}
   */
  checkUnsavedChanges(): Promise<boolean> | boolean {
    return this.unsavedChangesService.handle(this.user, this.form);
  }
}
