import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavToggleLinkComponent } from './sidenav-toggle-link.component';

describe('SidenavToggleLinkComponent', () => {
  let component: SidenavToggleLinkComponent;
  let fixture: ComponentFixture<SidenavToggleLinkComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [SidenavToggleLinkComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavToggleLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
