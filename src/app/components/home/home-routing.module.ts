import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'conta/:id',
        loadChildren: () =>
          import('./conta/conta.module').then((m) => m.ContaModule),
      },
      {
        path: 'dashboard/:id',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'apresentacao/:id',
        loadChildren: () =>
          import('./apresentacao/apresentacao.module').then(
            (m) => m.ApresentacaoModule
          ),
      },
      {
        path: 'tipo-ganho',
        loadChildren: () =>
          import('./tipo-ganho/tipo-ganho.module').then(
            (m) => m.TipoGanhoModule
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
