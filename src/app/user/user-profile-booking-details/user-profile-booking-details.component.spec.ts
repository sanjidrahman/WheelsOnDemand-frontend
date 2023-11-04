import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileBookingDetailsComponent } from './user-profile-booking-details.component';

describe('UserProfileBookingDetailsComponent', () => {
  let component: UserProfileBookingDetailsComponent;
  let fixture: ComponentFixture<UserProfileBookingDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileBookingDetailsComponent]
    });
    fixture = TestBed.createComponent(UserProfileBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
