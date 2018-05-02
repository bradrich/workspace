import { Injectable } from '@angular/core';
import { PreloadingStrategy } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { CustomRoute } from './router.model';

@Injectable()
export class RouterPreloadingService implements PreloadingStrategy {
  preloadedModules: string[] = [];

  preload(route: CustomRoute, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data.preload) {
      // Add the route path to the preloaded module array.
      this.preloadedModules.push(route.path);

      // Log the route path to the console.
      console.log(`Preloaded: ${route.path}`);

      return load();
    } else {
      return of(null);
    }
  }
}
