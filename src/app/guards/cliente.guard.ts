import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

export const clienteGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const user = userService.getCookie('user');
  if(user){
    if(user.userType === 'cliente') return true;
    // Mostrar modal si no hay usuario autenticado
    router.navigate(['/home']);
    userService.showLoginModal();
    return false;
  }
  // Mostrar modal si no hay usuario autenticado
  router.navigate(['/home']);
  userService.showLoginModal();
  return false;
};