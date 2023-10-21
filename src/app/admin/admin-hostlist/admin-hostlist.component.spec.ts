import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHostlistComponent } from './admin-hostlist.component';

describe('AdminHostlistComponent', () => {
  let component: AdminHostlistComponent;
  let fixture: ComponentFixture<AdminHostlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminHostlistComponent]
    });
    fixture = TestBed.createComponent(AdminHostlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
