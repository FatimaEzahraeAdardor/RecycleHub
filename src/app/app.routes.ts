import { Routes } from '@angular/router';
import { LoginComponent } from "./pages/auth/login/login.component";
import { RegisterComponent } from "./pages/auth/register/register.component";
import { HomeComponent } from "./pages/home/home.component";
import { DashboardComponent } from "./pages/particular/dashboard/dashboard.component";
import { DashboardComponent as DashboardCollectorComponent} from "./pages/collector/dashboard/dashboard.component";
import { authGuard } from "./core/guards/auth.guard";
import { nonAuthGuard } from "./core/guards/nonAuth.guard";
import {ProfileComponent} from "./pages/particular/profile/profile.component";
import {CollectionComponent} from "./pages/particular/collections/collection/collection.component";
import {CollectionComponent as RequestComponent } from "./pages/collector/collections/collection/collection.component";
import {CreateCollectionComponent} from "./pages/particular/collections/create-collection/create-collection.component";
import {UpdateCollectionComponent} from "./pages/particular/collections/update-collection/update-collection.component";

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
    path: 'dashboard', component: DashboardComponent, canActivate: [nonAuthGuard],children: [
      { path: 'profile/:id', component: ProfileComponent},
      { path: 'collections', component: CollectionComponent},
      { path: 'collections/create', component: CreateCollectionComponent },
      { path: 'collections/update/:id', component: UpdateCollectionComponent }

    ]
  },
  {
    path: 'dashboardCollector', component: DashboardCollectorComponent, canActivate: [nonAuthGuard],children:[
      { path: 'profile/:id', component: ProfileComponent},
      { path: 'collections', component: RequestComponent},

    ]

}
];
