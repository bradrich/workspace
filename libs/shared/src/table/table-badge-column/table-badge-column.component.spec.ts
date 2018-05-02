import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBadgeColumnComponent } from './table-badge-column.component';

describe('TableBadgeColumnComponent', () => {
  let component: TableBadgeColumnComponent;
  let fixture: ComponentFixture<TableBadgeColumnComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TableBadgeColumnComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBadgeColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
