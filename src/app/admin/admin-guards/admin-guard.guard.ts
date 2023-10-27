import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('adminToken')
  const userToken = localStorage.getItem('userToken')
  const hostToken = localStorage.getItem('hostToken')
  const router = inject(Router)
  console.log(userToken);
  if(userToken){
    router.navigate(['/home']);
    return false
  }else if (hostToken) {
    router.navigate(['/host'])
    return false
  }else{
    return true
  }
};
