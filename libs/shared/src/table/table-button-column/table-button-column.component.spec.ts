import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableButtonColumnComponent } from './table-button-column.component';

describe('TableButtonColumnComponent', () => {
  let component: TableButtonColumnComponent;
  let fixture: ComponentFixture<TableButtonColumnComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TableButtonColumnComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TableButtonColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
