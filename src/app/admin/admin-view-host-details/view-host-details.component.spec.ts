import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHostDetailsComponent } from './view-host-details.component';

describe('ViewHostDetailsComponent', () => {
  let component: ViewHostDetailsComponent;
  let fixture: ComponentFixture<ViewHostDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewHostDetailsComponent]
    });
    fixture = TestBed.createComponent(ViewHostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
