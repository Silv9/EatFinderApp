import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        redirectTo: '/tabs/Home',
        pathMatch: 'full'
      },
      {
        path: 'Mapa',
        loadChildren: () => import('../mapa/mapa.module').then(m => m.MapaPageModule)
      },
      {
        path: 'Cuenta',
        loadChildren: () => import('..//cuenta/cuenta.module').then(m => m.CuentaPageModule)
      },
      {
        path: 'Inicio',
        loadChildren: () => import('..//inicio/inicio.module').then(m => m.InicioPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/inicio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}