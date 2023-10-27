import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const adminGuardChildGuard: CanActivateChildFn = (childRoute, state) => {
  const token = localStorage.getItem('adminToken');
  const router = inject(Router)
  if(token) {
    return true
  }else{
    router.navigate(['admin'])
    return false
  }
};
