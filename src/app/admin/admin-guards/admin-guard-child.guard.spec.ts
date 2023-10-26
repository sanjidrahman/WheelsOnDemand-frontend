import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { adminGuardChildGuard } from './admin-guard-child.guard';

describe('adminGuardChildGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminGuardChildGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
