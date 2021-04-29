import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoDespesaComponent } from './tipo-despesa.component';


const routes: Routes = [
  {
    path: '',
    component: TipoDespesaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoDespesaRoutingModule {}