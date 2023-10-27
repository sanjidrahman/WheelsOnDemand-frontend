import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const hostChildGuardGuard: CanActivateChildFn = (childRoute, state) => {
  const hostToken = localStorage.getItem('hostToken');
  const router = inject(Router);
  if (hostToken) {
    return true;
  } else {
    router.navigate(['/host']);
    return false;
  }
};
