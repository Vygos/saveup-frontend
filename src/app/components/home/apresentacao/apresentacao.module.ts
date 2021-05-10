import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { SpinnerLoadingModule } from 'src/app/shared/components/spinner-loading/spinner-loading.module';
import { ApresentacaoComponent } from './apresentacao.component';

const routes: Routes = [
  {path: '', component: ApresentacaoComponent}
]

@NgModule({
  declarations: [ApresentacaoComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    MatCardModule,
    MatIconModule,
    MatTableModule,
    SpinnerLoadingModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class ApresentacaoModule { }
