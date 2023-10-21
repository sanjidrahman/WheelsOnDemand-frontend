import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpopupComponent } from './editpopup.component';

describe('EditpopupComponent', () => {
  let component: EditpopupComponent;
  let fixture: ComponentFixture<EditpopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditpopupComponent]
    });
    fixture = TestBed.createComponent(EditpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
