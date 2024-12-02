import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { inject } from '@angular/core';

export const clienteNoAuthGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const user = userService.getCookie('user');
  if(!user){
    return true;
  }
  return true;
};
