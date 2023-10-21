import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostUploadSuccessComponent } from './host-upload-success.component';

describe('HostUploadSuccessComponent', () => {
  let component: HostUploadSuccessComponent;
  let fixture: ComponentFixture<HostUploadSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostUploadSuccessComponent]
    });
    fixture = TestBed.createComponent(HostUploadSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
