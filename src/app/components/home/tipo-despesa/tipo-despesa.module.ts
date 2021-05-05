import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoDespesaRoutingModule } from './tipo-despesa-routing.module';
import { TipoDespesaComponent } from './tipo-despesa.component';
import { MatCardModule } from '@angular/material/card';
import { SpinnerLoadingModule } from 'src/app/shared/components/spinner-loading/spinner-loading.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ModalConfirmModule } from 'src/app/shared/components/modal-confirm/modal-confirm.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UpdateTipoDespesaComponent } from './update-tipo-despesa/update-tipo-despesa.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NovoCadastroComponent } from './novo-cadastro/novo-cadastro.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [TipoDespesaComponent, UpdateTipoDespesaComponent, NovoCadastroComponent],
  imports: [
    CommonModule,
    TipoDespesaRoutingModule,
    MatCardModule,
    SpinnerLoadingModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    ModalConfirmModule,
    MatPaginatorModule,
    MatButtonModule,
    FlexLayoutModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatSnackBarModule
  ],
  exports: [MatFormFieldModule, MatInputModule],
})
export class TipoDespesaModule {}
