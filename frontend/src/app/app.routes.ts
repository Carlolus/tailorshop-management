import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { FabricsListComponent } from './pages/fabrics/fabrics-list/fabrics-list.component';
import { CatalogComponent } from './pages/catalog/catalog-list/catalog.component';
import { LoginRedirectComponent } from './pages/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FabricsAdminComponent } from './pages/admin/fabrics-admin/fabrics-admin.component';
import { AuditLogComponent } from './pages/admin/audit-log/audit-log.component';
import { CatalogAdminComponent } from './pages/admin/catalog-admin/catalog-admin.component';
import { CustomersComponent } from './pages/admin/customers/customers.component';
import { SessionExpiredComponent } from './pages/session-expired/session-expired.component';
import { OrderCreationComponent } from './pages/admin/orders/order-creation/order-creation.component';
import { OrderListComponent } from './pages/admin/orders/order-list/order-list.component';
import { OrderDetailsComponent } from './pages/admin/orders/order-details/order-details.component';
import { GarmentDetailsComponent } from './pages/admin/garments/garment-details.component';
import { GarmentEditComponent } from './pages/admin/garments/garment-edit/garment-edit.component';
import { PaymentTableComponent } from './pages/admin/payments/payment-list/payment-table.component';
import { PaymentNewComponent } from './pages/admin/payments/payment-new/payment-new.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'session-expired', component: SessionExpiredComponent },
      { path: 'fabrics', component: FabricsListComponent },
      { path: 'catalog', component: CatalogComponent },
      { path: 'login', component: LoginRedirectComponent, canActivate: [GuestGuard] },
      {
        path: 'admin', canActivate: [AuthGuard],
        children: [
          { path: '', component: DashboardComponent, pathMatch: 'full' },
          { path: 'fabrics', component: FabricsAdminComponent },
          { path: 'customers', component: CustomersComponent },
          { path: 'logs', component: AuditLogComponent },
          { path: 'catalog', component: CatalogAdminComponent },
          { path: 'finance', component: PaymentTableComponent},
          {
            path: 'payments', component: PaymentTableComponent,
            children:[
              { path: ':mode/:id', component: PaymentNewComponent }     
            ]
          },
          {
            path: 'orders',
            children: [
              { path: '', component: OrderListComponent },
              { path: 'new', component: OrderCreationComponent },
              { path: ':id', component: OrderDetailsComponent }
            ]
          },
          {
            path: 'garments',
            children: [
              { path: ':id', component: GarmentDetailsComponent },
              { path: ':mode/:id', component: GarmentEditComponent }
            ]
          }
        ]
      }
    ]
  }
];