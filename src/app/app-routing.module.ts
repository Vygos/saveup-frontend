import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './service/auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./components/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'cadastro',
    loadChildren: () =>
      import('./components/cadastro/cadastro.module').then((m) => m.CadastroModule),
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('./components/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'main',
    loadChildren: () =>
      import('./components/main/main.module').then((m) => m.MainModule),
  },
  {
    path: "**", redirectTo: "/main"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
