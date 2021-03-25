import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContaComponent } from './conta.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: ContaComponent}
]

@NgModule({
  declarations: [ContaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ContaModule { }
