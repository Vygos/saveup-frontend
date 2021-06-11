import { SimpleChanges } from '@angular/core';
import { Component, Input, OnInit, Self } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormControl,
  NgControl,
} from '@angular/forms';
import { ValidatorService } from './validator.service';

@Component({
  selector: 'mat-error[validate]',
  template: `
    <div *ngIf="formControl.touched && formControl.invalid">
      <span *ngFor="let error of getErrors()">{{ error }}</span>
    </div>
  `,
  styleUrls: ['./validator.component.scss'],
})
export class ValidatorComponent implements OnInit {
  public formControl: FormControl;

  errors: string[];

  @Input() controlName;

  constructor(
    private control: ControlContainer,
    private service: ValidatorService
  ) {}

  ngOnInit(): void {
    this.formControl = this.control.control.get(
      this.controlName
    ) as FormControl;

    setTimeout(() => {
      this.controlName = this.control.control.get(
        this.controlName
      ) as FormControl;
    }, 5000)
  }

  getErrors() {
    return this.formControl.invalid ? this.getMessages() : [];
  }

  getMessages() {
    if (this.formControl.errors) {
      return Object.keys(this.formControl.errors).map(
        (key) => this.service.errorMsg[key]
      );
    }

    return [];
  }
}
