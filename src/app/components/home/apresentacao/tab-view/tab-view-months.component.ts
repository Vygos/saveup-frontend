import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Despesa } from 'src/app/models/despesa.model';
import { Ganho } from 'src/app/models/ganho.model';

interface Financa {
  mes: string;
  ganhos: Ganho[];
  despesas: Despesa[];
}
@Component({
  selector: 'tab-view-months',
  templateUrl: './tab-view-months.component.html',
  styleUrls: ['./tab-view-months.component.scss'],
})
export class TabViewMonthsComponent {
  form: FormGroup;
  _data: Financa[];

  isEditar: boolean = false;

  @Input()
  set data(data: Financa[]) {
    this._data = data;
  }
  

  constructor(private _fb: FormBuilder) {}

  get financas() {
    return this.form.get('financas') as FormArray;
  }
  

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this._fb.group({
      financas: this._fb.array(this.initFinancas(this._data)),
    });
    
  }

  initFinancas(financas: Financa[]) {
    return financas.map((financa) => this.createFinancaForm(financa));
  }

  initDespesas(despesas: Despesa[]) {
    return despesas.map((despesa) => this.createDespesaForm(despesa));
  }

  initGanhos(ganhos: Ganho[]) {
    return ganhos.map((ganho) => this.createGanhoForm(ganho));
  }


  createFinancaForm(financa?: Financa) {
    return this._fb.group({
      mes: [financa ? financa.mes : ''],
      despesas: this._fb.array(this.initDespesas(financa.despesas)),
      ganhos: this._fb.array(this.initGanhos(financa.ganhos)),
    });
  }

  createGanhoForm(ganho?: Ganho) {
    return this._fb.group({
      tipo: [ganho ? ganho.tipo : '', Validators.required],
      valor: [ganho ? ganho.valor : '', Validators.required]
    })
  }

  createDespesaForm(despesa?: Despesa) {
    return this._fb.group({
      tipo: [despesa ? despesa.tipo : '', Validators.required],
      valor: [despesa ? despesa.valor : '', Validators.required]
    })
  }


  asFormArray(nome: string, abstractControl: AbstractControl): FormArray {
    return abstractControl.get(nome) as FormArray;
  }


  adicionarGanho(financa: FormArray) {
    (financa.get('ganhos') as FormArray).push(this.createGanhoForm())
  }

  adicionarDespesa(financa: FormArray) {
    (financa.get('ganhos') as FormArray).push(this.createDespesaForm())
  }

  deletarGanho(modal: MatDialogRef<any>,financa: FormArray, index: number) {
    modal.close();
    (financa.get('ganhos') as FormArray).removeAt(index);
  }
  
  deletarDespesa(modal: MatDialogRef<any>,financa: FormArray, index: number) {
    (financa.get('despesas') as FormArray).removeAt(index);
  }
  


}
