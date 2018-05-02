import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BREAKPOINTS, FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'angular2-moment';
import { NgProgressInterceptor, NgProgressModule } from 'ngx-progressbar';
import { ResponsiveConfig, ResponsiveModule } from 'ngx-responsive';
import { Ng2Webstorage } from 'ngx-webstorage';

import { BreakpointConfig, ResponsiveDefinition } from './responsive/responsive.constants';
import { SharedMaterialModule } from './shared-material.module';

@NgModule({
  exports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    MomentModule,
    NgProgressModule,
    ResponsiveModule,
    Ng2Webstorage,
    SharedMaterialModule
  ],
  imports: [
    NgbModule.forRoot(),
    Ng2Webstorage.forRoot({ prefix: 'bf', separator: '-', caseSensitive: true })
  ],
  providers: [
    Title,
    { provide: LOCALE_ID, useValue: 'en' },
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true },
    { provide: BREAKPOINTS, useFactory: BreakpointConfig },
    { provide: ResponsiveConfig, useFactory: ResponsiveDefinition }
  ]
})
export class SharedVendorModule {}
