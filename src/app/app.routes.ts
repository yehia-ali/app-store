import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './shared/components/layout/layout.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/components/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [authGuard],
    children: [
      {
        path: 'admin',
        loadComponent: () =>
          import('./features/admin/components/admin-products/admin-products.component').then(
            (c) => c.AdminProductsComponent
          ),
        data: { role: 'admin' },
      },
      {
        path: 'user',
        loadComponent: () =>
          import('./features/user/components/user-products/user-products.component').then(
            (c) => c.UserProductsComponent
          ),
        data: { role: 'user' },
      },
    ],
  },
  { path: '**', redirectTo: '/login' },
];

