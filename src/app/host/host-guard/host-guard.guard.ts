import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const hostGuardGuard: CanActivateFn = (route, state) => {
  const userToken = localStorage.getItem('userToken');
  const adminToken = localStorage.getItem('adminToken');
  const router = inject(Router);
  if (userToken) {
    router.navigate(['']);
    return false;
  } else if (adminToken) {
    router.navigate(['/admin']);
    return false;
  } else {
    return true;
  }
};
