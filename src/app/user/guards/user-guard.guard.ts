import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const userGuardLogged: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('userToken')
  const router = inject(Router)
  if(!token){
    return true
  }else{
    router.navigate(['/'])
    return false
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



