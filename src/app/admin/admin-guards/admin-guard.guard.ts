import { CanActivateFn, Router } from '@angular/router';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('adminToken')
  const router = new Router()
  if(token){
    router.navigate(['a/dashboard']);
    return false
  }else{
    return true
  }
};
