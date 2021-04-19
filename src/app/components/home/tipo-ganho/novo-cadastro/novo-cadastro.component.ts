import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { TipoGanho } from 'src/app/models/tipo-ganho.model';
import { TipoGanhoService } from 'src/app/service/tipo-ganho.service';

export interface NovoCadastroModal<T> {
  tipoGanho: TipoGanho;
  dialogRef: MatDialogRef<T>;
}
@Component({
  selector: 'app-novo-cadastro',
  templateUrl: './novo-cadastro.component.html',
  styleUrls: ['./novo-cadastro.component.scss'],
})
export class NovoCadastroComponent implements OnInit {
  form: FormGroup;
  
  isLoading: boolean;

  onClose = new EventEmitter<NovoCadastroModal<NovoCadastroComponent>>();

  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<NovoCadastroComponent>,
    private tipoGanhoService: TipoGanhoService
  ) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      nome: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
        asyncValidators: this.isAlrealdyExistsByNome(this.tipoGanhoService),
      }),
    });
  }

  isAlrealdyExistsByNome(tipoGanhoService: TipoGanhoService) {
    return (control: AbstractControl) => {
      if (!control.value) {
        return null;
      }

      return tipoGanhoService
        .isAlreadyExistsByNome(control.value)
        .pipe(map((exists) => (exists ? { isNameAlreadyExists: true } : null)));
    };
  }

  salvar() {
    if (this.form.valid) {
      this.isLoading = true;

      const newTipoGanho = this.form.value as TipoGanho;

      this.onClose.emit({ tipoGanho: newTipoGanho, dialogRef: this.dialogRef });
    }
  }
}
