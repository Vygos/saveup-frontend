import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { TipoGanho } from 'src/app/models/tipo-ganho.model';
import { TipoGanhoService } from 'src/app/service/tipo-ganho.service';

@Component({
  selector: 'app-update-tipo-ganho',
  templateUrl: './update-tipo-ganho.component.html',
  styleUrls: ['./update-tipo-ganho.component.scss']
})
export class UpdateTipoGanhoComponent implements OnInit {

  form: FormGroup;

  onClose = new EventEmitter<any>();
  
  constructor(private tipoGanhoService: TipoGanhoService,  
    public dialogRef: MatDialogRef<UpdateTipoGanhoComponent>,
    private fb: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) private data: { tipoGanho: TipoGanho }) { }


  ngOnInit(): void {
    this.form = this.fb.group({ 
      nome: new FormControl(this.data.tipoGanho.nome, {
        validators: [Validators.required, Validators.minLength(3)],
        asyncValidators: this.isAlreadyExists(),
      })
    })
  }

  isAlreadyExists() {
    return ((control: AbstractControl) => {
      if (!control.value) {
        return null;
      }

      return this.tipoGanhoService.isAlreadyExistsByNome(control.value)
        .pipe(map(exist => exist ? { isNameAlreadyExists: true } : null));
    });
  }

  updateTipoGanho() {
    if (this.form.valid) {
      const { id } = this.data.tipoGanho;
      const { nome } = this.form.value;

      const updatedTipoGanho = { id, nome } as TipoGanho;

      this.onClose.emit({ updatedTipoGanho, dialogRef: this.dialogRef });
    }
  }

}
