import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostAddVehicleComponent } from './host-add-vehicle.component';

describe('HostAddVehicleComponent', () => {
  let component: HostAddVehicleComponent;
  let fixture: ComponentFixture<HostAddVehicleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostAddVehicleComponent]
    });
    fixture = TestBed.createComponent(HostAddVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
