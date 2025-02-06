import { Routes } from '@angular/router';
import { LoginComponent } from "./pages/auth/login/login.component";
import { RegisterComponent } from "./pages/auth/register/register.component";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { DashboardComponent } from "./pages/particular/dashboard/dashboard.component";
import { authGuard } from "./core/guards/auth.guard";
import { particularGuard } from "./core/guards/particular.guard";
import {ProfileComponent} from "./pages/particular/profile/profile.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login', component: LoginComponent, canActivate: [authGuard]
  },
  {
    path: 'register', component: RegisterComponent, canActivate: [authGuard]
  },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [particularGuard],children: [
      { path: 'profile/:id', component: ProfileComponent},
    ]
  }
];
