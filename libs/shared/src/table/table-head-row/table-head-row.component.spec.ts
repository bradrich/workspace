import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHeadRowComponent } from './table-head-row.component';

describe('TableHeadRowComponent', () => {
  let component: TableHeadRowComponent;
  let fixture: ComponentFixture<TableHeadRowComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TableHeadRowComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TableHeadRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
