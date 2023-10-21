import { CanActivateFn } from '@angular/router';

export const userGuardGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('userToken')
  console.log(token);
  if(token){
    return false
  }else{
    return true
  }
};



