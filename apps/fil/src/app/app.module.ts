import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { AdminModule } from '@swampfox/admin';
import { AuthModule } from '@swampfox/auth';
import { SharedModule } from '@swampfox/shared';

import { AppRoutingModule } from './app-routing.module';
import { AppStoreModule } from './app-store.module';
import { AppComponent } from './app.component';
import { appConstants } from './app.constants';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    SharedModule.forRoot(appConstants),
    AdminModule,
    AuthModule,
    LayoutModule,
    AppRoutingModule,
    AppStoreModule
  ]
})
export class AppModule {}
