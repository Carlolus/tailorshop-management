import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { FabricsComponent } from './pages/fabrics/fabrics.component';
import { CatalogComponent } from './pages/catalog/catalog.component';

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
        component: FabricsComponent // Ruta para "Telas"
      },
      {
        path: 'catalog',
        component: CatalogComponent // Ruta para "Catálogo"
      }
    ]
  }
];