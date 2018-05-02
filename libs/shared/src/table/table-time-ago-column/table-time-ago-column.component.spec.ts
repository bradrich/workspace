import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTimeAgoColumnComponent } from './table-time-ago-column.component';

describe('TableTimeAgoColumnComponent', () => {
  let component: TableTimeAgoColumnComponent;
  let fixture: ComponentFixture<TableTimeAgoColumnComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TableTimeAgoColumnComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTimeAgoColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
