import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostVehiclesComponent } from './host-vehicles.component';

describe('HostVehiclesComponent', () => {
  let component: HostVehiclesComponent;
  let fixture: ComponentFixture<HostVehiclesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostVehiclesComponent]
    });
    fixture = TestBed.createComponent(HostVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
