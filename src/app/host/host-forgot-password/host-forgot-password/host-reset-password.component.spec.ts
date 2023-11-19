import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostForgotPasswordComponent } from './host-reset-password.component';

describe('HostForgotPasswordComponent', () => {
  let component: HostForgotPasswordComponent;
  let fixture: ComponentFixture<HostForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostForgotPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HostForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
