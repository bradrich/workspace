import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sf-page-not-found',
  template: `
    <div class="d-flex flex-column align-items-center justify-content-center sf-fade-in-up" fxFlex>

      <div class="sf-image sf-zoom-in">
        <img [src]="assets.image" alt="Error" />
      </div>

      <h6 class="mt-1 sf-fade-in-up">Page Not Found</h6>

      <p class="sf-fade-in-up">The page you are looking for does not exist!</p>

    </div>
  `,
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  assets: any;

  /**
   * OnInit life-cycle method.
   */
  ngOnInit() {
    this.assets = {
      image: require('../../../assets/images/results.svg')
    };
  }
}
