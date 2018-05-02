import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavFunctionLinkComponent } from './sidenav-function-link.component';

describe('SidenavFunctionLinkComponent', () => {
  let component: SidenavFunctionLinkComponent;
  let fixture: ComponentFixture<SidenavFunctionLinkComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [SidenavFunctionLinkComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavFunctionLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
