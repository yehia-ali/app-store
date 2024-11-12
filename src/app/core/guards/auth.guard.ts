import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../features/auth/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  // Check if the user is authenticated
  if (!authService.isAuthenticated()) {
    // If not, navigate to the login page
    router.navigate(['/login']);
    return false;
  }

  // If authenticated, allow access
  return true;
};
