import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { FabricsListComponent } from './pages/fabrics/fabrics-list/fabrics-list.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { LoginRedirectComponent } from './pages/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FabricsAdminComponent } from './pages/admin/fabrics-admin/fabrics-admin.component';
import { AuditLogComponent } from './pages/admin/audit-log/audit-log.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'fabrics', component: FabricsListComponent },
      { path: 'catalog', component: CatalogComponent },
      { path: 'login', component: LoginRedirectComponent, canActivate: [GuestGuard] },
      {
        path: 'admin',
        canActivate: [AuthGuard], // Protection for all admin routes
        children: [
          { 
            path: '', 
            component: DashboardComponent, // show on /admin
            pathMatch: 'full'
          },
          { 
            path: 'fabrics', 
            component: FabricsAdminComponent
          },
          { 
            path: 'log', 
            component: AuditLogComponent
          }
        ]
      }
    ]
  }
];