import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostPartnershipComponent } from './host-partnership.component';

describe('HostPartnershipComponent', () => {
  let component: HostPartnershipComponent;
  let fixture: ComponentFixture<HostPartnershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostPartnershipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HostPartnershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
