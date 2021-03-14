import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ValidatorComponent } from "./validator.component";
import { ValidatorDirective } from "./validator.directive";

@NgModule({
    declarations: [ValidatorComponent, ValidatorDirective],
    imports: [CommonModule, MatFormFieldModule],
    exports: [ValidatorComponent, ValidatorDirective],
    entryComponents: [ValidatorComponent]
})
export class ValidatorModule {}