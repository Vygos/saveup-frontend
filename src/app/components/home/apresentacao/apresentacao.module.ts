import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApresentacaoComponent } from './apresentacao.component';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', component: ApresentacaoComponent}
]


@NgModule({
  declarations: [ApresentacaoComponent],
  imports: [
    CommonModule, 
    MatCardModule,
    FlexLayoutModule,
    RouterModule.forChild(routes)
  ]
})
export class ApresentacaoModule { }
