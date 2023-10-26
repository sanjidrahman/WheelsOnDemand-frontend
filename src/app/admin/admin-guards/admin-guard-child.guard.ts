import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const adminGuardChildGuard: CanActivateChildFn = (childRoute, state) => {
  const token = localStorage.getItem('adminToken');
  const router = new Router()
  if(token) {
    return true
  }else{
    router.navigate([''])
    return false
  }
};
