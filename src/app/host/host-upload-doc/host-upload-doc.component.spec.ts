import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostUploadDocComponent } from './host-upload-doc.component';

describe('HostUploadDocComponent', () => {
  let component: HostUploadDocComponent;
  let fixture: ComponentFixture<HostUploadDocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostUploadDocComponent]
    });
    fixture = TestBed.createComponent(HostUploadDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
