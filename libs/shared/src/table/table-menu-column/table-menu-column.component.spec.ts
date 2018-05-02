import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMenuColumnComponent } from './table-menu-column.component';

describe('TableMenuColumnComponent', () => {
  let component: TableMenuColumnComponent;
  let fixture: ComponentFixture<TableMenuColumnComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TableMenuColumnComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMenuColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
