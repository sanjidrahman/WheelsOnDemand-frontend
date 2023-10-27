import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { hostChildGuardGuard } from './host-child-guard.guard';

describe('hostChildGuardGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hostChildGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
