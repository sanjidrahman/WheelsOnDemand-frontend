import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { catchError, map, of } from 'rxjs';

export const ischoiceGuard: CanActivateFn = (route, state) => {
  const service = inject(UserService);
  const router = inject(Router);

  return service.getUser().pipe(
    map((res) => {
      if (res.choices) {
        return true;
      } else {
        router.navigate(['/select']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/select']);
      return of(false);
    })
  );
};
