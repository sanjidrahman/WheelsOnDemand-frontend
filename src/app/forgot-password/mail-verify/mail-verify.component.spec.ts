import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailVerifyComponent } from './mail-verify.component';

describe('MailVerifyComponent', () => {
  let component: MailVerifyComponent;
  let fixture: ComponentFixture<MailVerifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MailVerifyComponent]
    });
    fixture = TestBed.createComponent(MailVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
