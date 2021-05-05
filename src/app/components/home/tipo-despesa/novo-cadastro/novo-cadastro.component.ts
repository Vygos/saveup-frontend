import { Component, EventEmitter, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { TipoDespesa } from 'src/app/models/tipo-despesa.model';
import { TipoDespesaService } from 'src/app/service/tipo-despesa.service';

export interface NovoCadastro<T> {
  tipoDespesa: TipoDespesa;
  dialogRef: MatDialogRef<T>;
}

@Component({
  selector: 'app-novo-cadastro',
  templateUrl: './novo-cadastro.component.html',
  styleUrls: ['./novo-cadastro.component.scss']
})
export class NovoCadastroComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  onClose = new EventEmitter<NovoCadastro<NovoCadastroComponent>>();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NovoCadastroComponent>,
    private tipoDespesaService: TipoDespesaService
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
        asyncValidators: this.isAlrealdyExistsByNome()
      })
    });
  }

  isAlrealdyExistsByNome() {
    return (control: AbstractControl) => {
      if (!control.value) {
        return null;
      }

      return this.tipoDespesaService
        .isAlreadyExistsByNome(control.value)
        .pipe(map((exists) => (exists ? { isNameAlreadyExists: true } : null)));
    };
  }

  salvar() {
    if (this.form.valid) {
      const newTipoDespesa = this.form.value as TipoDespesa;

      this.onClose.emit({ tipoDespesa: newTipoDespesa, dialogRef: this.dialogRef });
    }
  }
}
