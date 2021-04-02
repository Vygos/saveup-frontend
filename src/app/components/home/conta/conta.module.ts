import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContaComponent } from './conta.component';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ValidatorModule } from 'src/app/shared/components/validator/validator.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerLoadingModule } from 'src/app/shared/components/spinner-loading/spinner-loading.module';
import { MatIconModule } from '@angular/material/icon';
import { FotoInputDirective } from './foto-input/foto-input.directive';
import { FotoInputComponent } from './foto-input/foto-input.component';

const routes: Routes = [
  {path: '', component: ContaComponent}
]

@NgModule({
  declarations: [ContaComponent, FotoInputDirective, FotoInputComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ValidatorModule,
    SpinnerLoadingModule,
    MatIconModule
  ]
})
export class ContaModule { }
