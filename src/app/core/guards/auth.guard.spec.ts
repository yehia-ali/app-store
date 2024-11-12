import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authGuard } from './auth.guard';
import { AuthService } from '../../features/auth/services/auth.service';
import { inject } from '@angular/core';

describe('authGuard', () => {
  const authService = inject(AuthService);
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should authenticate the user', () => {
    const result = authService.login('user', 'user');
    expect(result).toBeTrue();
  });

  it('should return false for invalid login', () => {
    const result = authService.login('invalid', 'user');
    expect(result).toBeFalse();
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
