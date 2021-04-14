import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoGanhoComponent } from './lista/tipo-ganho.component';
import { TipoGanhoRoutingModule } from './tipo-ganho-routing.module';
import { ValidatorModule } from 'src/app/shared/components/validator/validator.module';
import { SpinnerLoadingComponent } from 'src/app/shared/components/spinner-loading/spinner-loading.component';
import { SpinnerLoadingModule } from 'src/app/shared/components/spinner-loading/spinner-loading.module';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [TipoGanhoComponent],
  imports: [
    CommonModule,
    TipoGanhoRoutingModule,
    ValidatorModule,
    SpinnerLoadingModule,
    MatTableModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule
  ],
})
export class TipoGanhoModule {}
