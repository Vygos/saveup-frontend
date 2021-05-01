import { Component, EventEmitter, Inject, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoDespesa } from 'src/app/models/tipo-despesa.model';

@Component({
  selector: 'app-update-tipo-despesa',
  templateUrl: './update-tipo-despesa.component.html',
  styleUrls: ['./update-tipo-despesa.component.scss'],
})
export class UpdateTipoDespesaComponent implements OnInit {
  form: FormGroup;

  onClose = new EventEmitter<any>();

  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateTipoDespesaComponent>,

    @Inject(MAT_DIALOG_DATA) private data: { tipoDespesa: TipoDespesa }
  ) {}

  ngOnInit(): void {
    const { nome } = this.data.tipoDespesa;
    this.form = this._fb.group({
      nome: new FormControl(nome, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
    });
  }

  updateTipoDespesa() {
    if (this.form.valid) {
      const { nome } = this.form.value;
      const { id } = this.data.tipoDespesa;

      const updatedTipoDespesa = { id, nome } as TipoDespesa;

      this.onClose.emit({ updatedTipoDespesa, dialogRef: this.dialogRef });
    }
  }
}
