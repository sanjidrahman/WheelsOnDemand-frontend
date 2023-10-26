import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostEditVehicleComponent } from './host-edit-vehicle.component';

describe('HostEditVehicleComponent', () => {
  let component: HostEditVehicleComponent;
  let fixture: ComponentFixture<HostEditVehicleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostEditVehicleComponent]
    });
    fixture = TestBed.createComponent(HostEditVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
