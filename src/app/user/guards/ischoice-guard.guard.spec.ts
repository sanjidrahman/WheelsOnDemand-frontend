import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { ischoiceGuardGuard } from './ischoice-guard.guard';

describe('ischoiceGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => ischoiceGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
