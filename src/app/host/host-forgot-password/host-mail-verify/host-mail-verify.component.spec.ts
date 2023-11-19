import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostMailVerifyComponent } from './host-mail-verify.component';

describe('HostMailVerifyComponent', () => {
  let component: HostMailVerifyComponent;
  let fixture: ComponentFixture<HostMailVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostMailVerifyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HostMailVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
