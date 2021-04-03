import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ValidatorComponent } from "./validator.component";


@NgModule({
    declarations: [ValidatorComponent],
    imports: [CommonModule, MatFormFieldModule],
    exports: [ValidatorComponent],
    entryComponents: [ValidatorComponent]
})
export class ValidatorModule {}