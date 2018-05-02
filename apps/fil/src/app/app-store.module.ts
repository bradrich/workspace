import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  CustomRouterStateSerializer,
  sharedMetaReducers,
  sharedReducers,
  SharedState
} from '@swampfox/shared';

import { environment } from '../environments/environment';

const metaReducers: MetaReducer<SharedState>[] = !environment.production ? sharedMetaReducers : [];

@NgModule({
  exports: [StoreModule, StoreRouterConnectingModule, StoreDevtoolsModule, EffectsModule],
  imports: [
    StoreModule.forRoot(sharedReducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    StoreDevtoolsModule.instrument({
      name: 'FIL NgRx Devtools',
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([])
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }]
})
export class AppStoreModule {}
