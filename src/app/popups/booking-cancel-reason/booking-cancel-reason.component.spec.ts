import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCancelReasonComponent } from './booking-cancel-reason.component';

describe('BookingCancelReasonComponent', () => {
  let component: BookingCancelReasonComponent;
  let fixture: ComponentFixture<BookingCancelReasonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingCancelReasonComponent]
    });
    fixture = TestBed.createComponent(BookingCancelReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
