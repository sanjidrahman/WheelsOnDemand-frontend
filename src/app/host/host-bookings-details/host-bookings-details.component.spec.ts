import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostBookingsDetailsComponent } from './host-bookings-details.component';

describe('HostBookingsDetailsComponent', () => {
  let component: HostBookingsDetailsComponent;
  let fixture: ComponentFixture<HostBookingsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostBookingsDetailsComponent]
    });
    fixture = TestBed.createComponent(HostBookingsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
