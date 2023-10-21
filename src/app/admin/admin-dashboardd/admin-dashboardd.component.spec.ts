import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { AdminDashboarddComponent } from './admin-dashboardd.component';

describe('AdminDashboarddComponent', () => {
  let component: AdminDashboarddComponent;
  let fixture: ComponentFixture<AdminDashboarddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDashboarddComponent],
      imports: [
        NoopAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatIconModule,
        MatMenuModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboarddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
