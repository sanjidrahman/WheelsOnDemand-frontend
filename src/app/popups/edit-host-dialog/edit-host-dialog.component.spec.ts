import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHostDialogComponent } from './edit-host-dialog.component';

describe('EditHostDialogComponent', () => {
  let component: EditHostDialogComponent;
  let fixture: ComponentFixture<EditHostDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditHostDialogComponent]
    });
    fixture = TestBed.createComponent(EditHostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
