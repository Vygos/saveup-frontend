import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import { SpinnerLoadingModule } from 'src/app/shared/components/spinner-loading/spinner-loading.module';
import { ApresentacaoComponent } from './apresentacao.component';
import { TabViewMonthsComponent } from './tab-view/tab-view-months.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { CurrencyMaskConfig, CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { ModalConfirmModule } from 'src/app/shared/components/modal-confirm/modal-confirm.module';
import { ValidatorModule } from 'src/app/shared/components/validator/validator.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes: Routes = [{ path: '', component: ApresentacaoComponent }];

const customCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: false,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
}

@NgModule({
  declarations: [ApresentacaoComponent, TabViewMonthsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatIconModule,
    MatTableModule,
    SpinnerLoadingModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    ModalConfirmModule,
    ValidatorModule,
    MatSnackBarModule
  ],
})
export class ApresentacaoModule {}
