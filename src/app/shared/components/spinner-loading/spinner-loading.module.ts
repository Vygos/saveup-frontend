import { NgModule } from '@angular/core';
import { SpinnerLoadingComponent } from './spinner-loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SpinnerLoadingComponent],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [SpinnerLoadingComponent]
})
export class SpinnerLoadingModule {}
