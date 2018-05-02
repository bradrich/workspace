import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';

import { SidenavSection } from './sidenav.model';

@Injectable()
export class SidenavService {
  /**
   * Sets the necessary section parameters as Observables.
   * @param {SidenavSection[]} sections
   * @returns {SidenavSection[]}
   */
  setSections(sections: SidenavSection[]): SidenavSection[] {
    sections.forEach((section: SidenavSection) => {
      section.name = typeof section.name === 'string' ? of(section.name) : section.name;
      section.isHidden =
        typeof section.isHidden === 'boolean' ? of(section.isHidden) : section.isHidden;

      if (section.pages) {
        section.pages.forEach((page: SidenavSection) => {
          page.name = typeof page.name === 'string' ? of(page.name) : page.name;
          page.isHidden = typeof page.isHidden === 'boolean' ? of(page.isHidden) : page.isHidden;
        });
      }
    });

    return sections;
  }
}
