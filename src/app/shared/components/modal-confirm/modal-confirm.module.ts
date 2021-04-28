import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalConfirmDirective } from './modal-confirm.directive';
import { ModalConfirmComponent } from './modal-confirm.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [ModalConfirmDirective, ModalConfirmComponent],
  exports: [ModalConfirmDirective],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ]
})
export class ModalConfirmModule { }
