import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/auth/login/login.component";
import {RegisterComponent} from "./pages/auth/register/register.component";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./pages/home/home.component";
import {DashboardComponent} from "./pages/particular/dashboard/dashboard.component";
import {authGuard} from "./core/guards/auth.guard";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'register', component: RegisterComponent,
  },
  {
    path: 'dashboard', component: DashboardComponent,canActivate: [authGuard]
  }
];
