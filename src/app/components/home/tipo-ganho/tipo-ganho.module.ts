import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoGanhoComponent } from './lista/tipo-ganho.component';
import { TipoGanhoRoutingModule } from './tipo-ganho-routing.module';
import { ValidatorModule } from 'src/app/shared/components/validator/validator.module';
import { SpinnerLoadingComponent } from 'src/app/shared/components/spinner-loading/spinner-loading.component';
import { SpinnerLoadingModule } from 'src/app/shared/components/spinner-loading/spinner-loading.module';



@NgModule({
  declarations: [TipoGanhoComponent],
  imports: [
    CommonModule,
    TipoGanhoRoutingModule,
    ValidatorModule,
    SpinnerLoadingModule
  ]
})
export class TipoGanhoModule { }
