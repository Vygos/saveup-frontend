import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoGanhoComponent } from './lista/tipo-ganho.component';

const routes: Routes = [
  {
    path: '',
    component: TipoGanhoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoGanhoRoutingModule {}
