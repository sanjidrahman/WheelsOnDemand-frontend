import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const userGuardLogged: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('userToken')
  const adminToken = localStorage.getItem('adminToken')
  const hostToken = localStorage.getItem('hostToken')
  const router = inject(Router)
  if(adminToken){
    router.navigate(['/admin'])
    return false
  } else if (hostToken) {
    router.navigate(['/host'])
    return false
  } else {
    return true
  }
};

export const userGuardLogout: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('userToken')
  const router = inject(Router)
  if(token){
    return true
  }else{
    router.navigate(['/login'])
    return false
  }
};



