import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRepeatColumnComponent } from './table-repeat-column.component';

describe('TableRepeatColumnComponent', () => {
  let component: TableRepeatColumnComponent;
  let fixture: ComponentFixture<TableRepeatColumnComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TableRepeatColumnComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRepeatColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
