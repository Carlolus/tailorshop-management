import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { FabricsComponent } from './pages/fabrics/fabrics.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { NotLoggedInGuard } from './core/guards/notloggedin.guard';
import {LoginRedirectComponent} from './pages/login/login.component';
import { LoggedInGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'fabrics',
        component: FabricsComponent,
      },
      {
        path: 'catalog',
        component: CatalogComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [LoggedInGuard]
      },
      {
        path: 'login',
        component: LoginRedirectComponent,
        canActivate: [NotLoggedInGuard]
      }
    ]
  }
];