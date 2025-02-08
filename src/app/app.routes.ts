import { Routes } from '@angular/router';
import { LoginComponent } from "./pages/auth/login/login.component";
import { RegisterComponent } from "./pages/auth/register/register.component";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { DashboardComponent } from "./pages/particular/dashboard/dashboard.component";
import { authGuard } from "./core/guards/auth.guard";
import { particularGuard } from "./core/guards/particular.guard";
import {ProfileComponent} from "./pages/particular/profile/profile.component";
import {CollectionComponent} from "./pages/particular/collections/collection/collection.component";
import {CreateCollectionComponent} from "./pages/particular/collections/create-collection/create-collection.component";

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
      { path: 'collections', component: CollectionComponent},
      { path: 'collections/create', component: CreateCollectionComponent },

    ]
  }
];
