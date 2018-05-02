import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableQuickAddFormComponent } from './table-quick-add-form.component';

describe('TableQuickAddFormComponent', () => {
  let component: TableQuickAddFormComponent;
  let fixture: ComponentFixture<TableQuickAddFormComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TableQuickAddFormComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TableQuickAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
