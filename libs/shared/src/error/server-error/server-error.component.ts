import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sf-server-error',
  template: `
    <div class="d-flex flex-column h-100 align-items-center justify-content-center">

      <div class="sf-image sf-zoom-in">
        <img [src]="assets.image" alt="Error" />
      </div>

      <h6 class="mt-1 sf-fade-in-up">Server Error</h6>

      <p class="sf-fade-in-up">
        There is a server error preventing the application from being used. Please try again later.
      </p>

    </div>
  `
})
export class ServerErrorComponent implements OnInit {
  assets: any;

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.assets = {
      image: null
    };
  }
}
