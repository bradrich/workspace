import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sf-access-denied',
  template: `
    <div class="sf-image sf-zoom-in">
      <img [src]="assets.image" alt="Error" />
    </div>

    <h6 class="mt-1 sf-fade-in-up">Access Denied</h6>

    <p class="sf-fade-in-up">
      You do not have the proper authorization to view the page you have requested.
    </p>
  `
})
export class AccessDeniedComponent implements OnInit {
  assets: any;

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.assets = {
      results: require('../../assets/images/results.svg')
    };
  }
}
