import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule, Routes } from "@angular/router";
import { CheckAnimationModule } from "src/app/shared/components/check-animation/check-animation.module";
import { SpinnerLoadingModule } from "src/app/shared/components/spinner-loading/spinner-loading.module";
import { ValidatorModule } from "src/app/shared/components/validator/validator.module";
import { LoginComponent } from "../login/login.component";
import { CadastroComponent } from "./cadastro.component";

const routes: Routes = [{
    path: "",
    component: CadastroComponent
}]

@NgModule({
    declarations: [CadastroComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      MatToolbarModule,
      FlexLayoutModule,
      MatCardModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      SpinnerLoadingModule,
      ValidatorModule,
      CheckAnimationModule
    ]
  
  })
export class CadastroModule {
    
}