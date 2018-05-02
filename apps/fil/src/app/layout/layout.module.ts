import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SidenavService } from './sidenav/sidenav.service';

@NgModule({
  declarations: [],
  entryComponents: [],
  imports: [],
  providers: [SidenavService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutModule {}
