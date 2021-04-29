import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoDespesaRoutingModule } from './tipo-despesa-routing.module';
import { TipoDespesaComponent } from './tipo-despesa.component';


@NgModule({
  declarations: [TipoDespesaComponent],
  imports: [
    CommonModule,
    TipoDespesaRoutingModule
  ],
})
export class TipoDespesaModule {}
