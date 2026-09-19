import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { DashboardComponent } from './components/dashboard/dashboard';
import { Tasks } from './components/tasks/tasks';
import { ProfileComponent } from './components/profile/profile';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tasks', component: Tasks },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: 'dashboard' }
];