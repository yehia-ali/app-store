import { Injectable, signal } from '@angular/core';
import { User, UserRole } from '../models/user.model';
import { usersData } from '../models/users-data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser = signal<{ username: string; role: UserRole } | null>(this.loadUserFromLocalStorage());
  private users = signal<Record<string, User>>(usersData);

  private loadUserFromLocalStorage(): { username: string; role: UserRole } | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  private saveUserToLocalStorage(user: { username: string; role: UserRole } | null): void {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }

  login(username: string, password: string): boolean {
    const user = this.users()[username];
    if (user?.password === password) {
      const currentUser = { username, role: user.role };
      this.currentUser.set(currentUser);
      this.saveUserToLocalStorage(currentUser); 
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser.set(null);
    this.saveUserToLocalStorage(null);
  }

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  getRole(): UserRole {
    return this.currentUser()?.role ?? null;
  }
}
