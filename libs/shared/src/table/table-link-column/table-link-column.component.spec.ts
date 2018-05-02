import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLinkColumnComponent } from './table-link-column.component';

describe('TableLinkColumnComponent', () => {
  let component: TableLinkColumnComponent;
  let fixture: ComponentFixture<TableLinkColumnComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TableLinkColumnComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TableLinkColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
