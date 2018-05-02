import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { HealthEffects } from './health/state/health.effects';
import { adminReducers } from './reducers';
import { UserEffects } from './user/state/user.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('admin', adminReducers),
    EffectsModule.forFeature([HealthEffects, UserEffects])
  ]
})
export class AdminStoreModule {}
