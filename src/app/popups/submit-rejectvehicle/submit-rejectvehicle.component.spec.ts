import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitRejectvehicleComponent } from './submit-rejectvehicle.component';

describe('SubmitRejectvehicleComponent', () => {
  let component: SubmitRejectvehicleComponent;
  let fixture: ComponentFixture<SubmitRejectvehicleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitRejectvehicleComponent]
    });
    fixture = TestBed.createComponent(SubmitRejectvehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
