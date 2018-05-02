import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetForceDialogComponent } from './password-reset-force-dialog.component';

describe('PasswordResetForceDialogComponent', () => {
  let component: PasswordResetForceDialogComponent;
  let fixture: ComponentFixture<PasswordResetForceDialogComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [PasswordResetForceDialogComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetForceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
