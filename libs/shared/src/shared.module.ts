import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Inject, ModuleWithProviders, NgModule } from '@angular/core';

import { AboutDialogComponent } from './about/about-dialog.component';
import { AboutService } from './about/about.service';
import { AlertInterceptor } from './alert/alert.interceptor';
import { AlertService } from './alert/alert.service';
import { ApiService } from './api/api.service';
import { ConstantsHelper } from './constants/constants.helper';
import {
  Constants,
  CONSTANTS_TOKEN,
  IConstants,
  provideConstants
} from './constants/constants.model';
import { EditPanelDirective } from './edit-panel/edit-panel.directive';
import { ErrorComponent } from './error/error.component';
import { NoResultsComponent } from './error/no-results/no-results.component';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { ServerErrorComponent } from './error/server-error/server-error.component';
import { UnsavedChangesDialogComponent } from './error/unsaved-changes/unsaved-changes-dialog.component';
import { UnsavedChangesGuard } from './error/unsaved-changes/unsaved-changes.guard';
import { UnsavedChangesService } from './error/unsaved-changes/unsaved-changes.service';
import { FooterComponent } from './footer/footer.component';
import { FormButtonsComponent } from './form/buttons/form-buttons.component';
import { ColorPickerInputComponent } from './form/color-picker/color-picker-input.component';
import { ErrorMessagesComponent } from './form/error-messages/error-messages.component';
import { FormService } from './form/form.service';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { LoadingService } from './loading/loading.service';
import { SpinnerComponent } from './loading/spinner/spinner.component';
import { PageTitleService } from './page-title/page-title.service';
import { PaginationControlsComponent } from './pagination/pagination-controls.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PaginationService } from './pagination/pagination.service';
import { PasswordStrengthComponent } from './password-strength/password-strength.component';
import { PasswordStrengthService } from './password-strength/password-strength.service';
import { CapitalCasePipe } from './pipes/capital-case.pipe';
import { DebouncePipe } from './pipes/debounce.pipe';
import { DefaultValuePipe } from './pipes/default-value.pipe';
import { ElementPositionPipe } from './pipes/element-position.pipe';
import { EncryptedPipe } from './pipes/encrypted.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { KeysPipe } from './pipes/keys.pipe';
import { NaturalTypingPipe } from './pipes/natural-typing.pipe';
import { NoSpacesPipe } from './pipes/no-spaces.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { PhonePipe } from './pipes/phone.pipe';
import { RemoveUngroupedGroupPipe } from './pipes/remove-ungrouped-group.pipe';
import { ReversePipe } from './pipes/reverse.pipe';
import { TitleCasePipe } from './pipes/title-case.pipe';
import { ResponsiveService } from './responsive/responsive.service';
import { RouterPreloadingService } from './router/router-preloading.service';
import { RouterService } from './router/router.service';
import { SharedVendorModule } from './shared-vendor.module';
import { SidenavFunctionLinkComponent } from './sidenav/sidenav-function-link.component';
import { SidenavLinkComponent } from './sidenav/sidenav-link.component';
import { SidenavToggleLinkComponent } from './sidenav/sidenav-toggle-link.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavService } from './sidenav/sidenav.service';
import { TableBadgeColumnComponent } from './table/table-badge-column/table-badge-column.component';
import { TableButtonColumnComponent } from './table/table-button-column/table-button-column.component';
import { TableHeadRowComponent } from './table/table-head-row/table-head-row.component';
import { TableLinkColumnComponent } from './table/table-link-column/table-link-column.component';
import { TableMenuColumnComponent } from './table/table-menu-column/table-menu-column.component';
import { TableQuickAddFormComponent } from './table/table-quick-add-form/table-quick-add-form.component';
import { TableRepeatColumnComponent } from './table/table-repeat-column/table-repeat-column.component';
import { TableTextColumnComponent } from './table/table-text-column/table-text-column.component';
import { TableTimeAgoColumnComponent } from './table/table-time-ago-column/table-time-ago-column.component';
import { TableTitleComponent } from './table/table-title/table-title.component';
import { TableComponent } from './table/table.component';
import { UtilityService } from './utility/utility.service';

@NgModule({
  declarations: [
    AboutDialogComponent,
    EditPanelDirective,
    NoResultsComponent,
    PageNotFoundComponent,
    ServerErrorComponent,
    UnsavedChangesDialogComponent,
    ErrorComponent,
    FooterComponent,
    FormButtonsComponent,
    ColorPickerInputComponent,
    ErrorMessagesComponent,
    HeaderComponent,
    LayoutComponent,
    SpinnerComponent,
    PaginationControlsComponent,
    PaginationComponent,
    PasswordStrengthComponent,
    CapitalCasePipe,
    DebouncePipe,
    DefaultValuePipe,
    ElementPositionPipe,
    EncryptedPipe,
    FilterPipe,
    KeysPipe,
    NaturalTypingPipe,
    NoSpacesPipe,
    OrderByPipe,
    PhonePipe,
    RemoveUngroupedGroupPipe,
    ReversePipe,
    TitleCasePipe,
    SidenavFunctionLinkComponent,
    SidenavLinkComponent,
    SidenavToggleLinkComponent,
    SidenavComponent,
    TableBadgeColumnComponent,
    TableButtonColumnComponent,
    TableHeadRowComponent,
    TableLinkColumnComponent,
    TableMenuColumnComponent,
    TableQuickAddFormComponent,
    TableRepeatColumnComponent,
    TableTextColumnComponent,
    TableTimeAgoColumnComponent,
    TableTitleComponent,
    TableComponent
  ],
  entryComponents: [AboutDialogComponent, UnsavedChangesDialogComponent],
  exports: [
    SharedVendorModule,
    AboutDialogComponent,
    EditPanelDirective,
    NoResultsComponent,
    PageNotFoundComponent,
    ServerErrorComponent,
    UnsavedChangesDialogComponent,
    ErrorComponent,
    FooterComponent,
    FormButtonsComponent,
    ColorPickerInputComponent,
    ErrorMessagesComponent,
    HeaderComponent,
    LayoutComponent,
    SpinnerComponent,
    PaginationControlsComponent,
    PaginationComponent,
    PasswordStrengthComponent,
    CapitalCasePipe,
    DebouncePipe,
    DefaultValuePipe,
    ElementPositionPipe,
    EncryptedPipe,
    FilterPipe,
    KeysPipe,
    NaturalTypingPipe,
    NoSpacesPipe,
    OrderByPipe,
    PhonePipe,
    RemoveUngroupedGroupPipe,
    ReversePipe,
    TitleCasePipe,
    SidenavFunctionLinkComponent,
    SidenavLinkComponent,
    SidenavToggleLinkComponent,
    SidenavComponent,
    TableBadgeColumnComponent,
    TableButtonColumnComponent,
    TableHeadRowComponent,
    TableLinkColumnComponent,
    TableMenuColumnComponent,
    TableQuickAddFormComponent,
    TableRepeatColumnComponent,
    TableTextColumnComponent,
    TableTimeAgoColumnComponent,
    TableTitleComponent,
    TableComponent
  ],
  imports: [SharedVendorModule],
  providers: [
    AboutService,
    { provide: HTTP_INTERCEPTORS, useClass: AlertInterceptor, multi: true },
    AlertService,
    ApiService,
    UnsavedChangesGuard,
    UnsavedChangesService,
    FormService,
    LoadingService,
    PageTitleService,
    PaginationService,
    PasswordStrengthService,
    ResponsiveService,
    RouterPreloadingService,
    RouterService,
    SidenavService,
    UtilityService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
  static forRoot(constants: IConstants): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        { provide: CONSTANTS_TOKEN, useValue: constants },
        { provide: Constants, useFactory: provideConstants, deps: [CONSTANTS_TOKEN] }
      ]
    };
  }

  constructor(@Inject(Constants) constants: Constants) {
    ConstantsHelper.setConstants(constants);
  }
}
