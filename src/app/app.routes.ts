import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./components/login/login').then(m => m.Login) },
  { path: 'register', loadComponent: () => import('./components/register/register').then(m => m.RegisterComponent) },
  { path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard').then(m => m.DashboardComponent), canActivate: [authGuard] },
  { path: 'tasks', loadComponent: () => import('./components/tasks/tasks').then(m => m.Tasks), canActivate: [authGuard] },
  { path: 'profile', loadComponent: () => import('./components/profile/profile').then(m => m.ProfileComponent), canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];