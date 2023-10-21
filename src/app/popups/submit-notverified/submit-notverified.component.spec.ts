import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitNotverifiedComponent } from './submit-notverified.component';

describe('SubmitNotverifiedComponent', () => {
  let component: SubmitNotverifiedComponent;
  let fixture: ComponentFixture<SubmitNotverifiedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubmitNotverifiedComponent]
    });
    fixture = TestBed.createComponent(SubmitNotverifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
