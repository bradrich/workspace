import { Injectable } from '@angular/core';
import * as pleaseWait from 'please-wait';

import { spinnerFoldingCubeTemplate } from './spinner/spinner.constants';

@Injectable()
export class LoadingService {
  private loadingScreen = null;
  private spinnerTemplate = spinnerFoldingCubeTemplate;

  /**
   * Begins the loading screen process where a new `pleaseWait` object is created. This will show
   * the loading screen until `finish` is called.
   */
  begin() {
    if (this.loadingScreen !== null) {
      return;
    }

    this.loadingScreen = pleaseWait.pleaseWait({
      logo: require('../../assets/images/swampfox-logo-gray.png'),
      loadingHtml: this.spinnerTemplate
    });
  }

  /**
   * Finishes the loading screen process.
   */
  finish() {
    if (this.loadingScreen === null) {
      return;
    }

    setTimeout(() => {
      this.loadingScreen.finish(true);
      this.loadingScreen = null;
    }, 500);
  }
}
