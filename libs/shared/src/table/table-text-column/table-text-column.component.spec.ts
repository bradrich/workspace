import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTextColumnComponent } from './table-text-column.component';

describe('TableTextColumnComponent', () => {
  let component: TableTextColumnComponent;
  let fixture: ComponentFixture<TableTextColumnComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TableTextColumnComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTextColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
