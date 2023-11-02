import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHostVehicleDetailsComponent } from './admin-host-vehicle-details.component';

describe('AdminHostVehicleDetailsComponent', () => {
  let component: AdminHostVehicleDetailsComponent;
  let fixture: ComponentFixture<AdminHostVehicleDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminHostVehicleDetailsComponent]
    });
    fixture = TestBed.createComponent(AdminHostVehicleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
