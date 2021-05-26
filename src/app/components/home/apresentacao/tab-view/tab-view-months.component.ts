import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { Despesa } from 'src/app/models/despesa.model';
import { Ganho } from 'src/app/models/ganho.model';
import { TipoDespesa } from 'src/app/models/tipo-despesa.model';
import { TipoGanho } from 'src/app/models/tipo-ganho.model';
import { TipoDespesaService } from 'src/app/service/tipo-despesa.service';
import { TipoGanhoService } from 'src/app/service/tipo-ganho.service';

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
  formCopy: any;
  _data: Financa[];

  tipoGanhos: TipoGanho[];
  tipoDespesas: TipoDespesa[];

  isEditar: boolean = false;

  @Input()
  set data(data: Financa[]) {
    this._data = data;
    this.initForm();
  }

  constructor(
    private _fb: FormBuilder,
    private tipoGanhoService: TipoGanhoService,
    private tipoDespesaService: TipoDespesaService
  ) {}

  get financas() {
    return this.form.get('financas') as FormArray;
  }

  ngOnInit(): void {
    this.loadTipos();
  }

  loadTipos() {
    forkJoin([
      this.tipoGanhoService.findAllDefault(),
      this.tipoDespesaService.findAllDefault(),
    ]).subscribe(([tipoGanhos, tipoDespesa]) => {
      this.tipoGanhos = tipoGanhos as TipoGanho[];
      this.tipoDespesas = tipoDespesa as TipoDespesa[];
    });
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
      valor: [ganho ? ganho.valor : '', Validators.required],
    });
  }

  createDespesaForm(despesa?: Despesa) {
    return this._fb.group({
      tipo: [despesa ? despesa.tipo : '', Validators.required],
      valor: [despesa ? despesa.valor : '', Validators.required],
    });
  }

  asFormArray(nome: string, abstractControl: AbstractControl): FormArray {
    return abstractControl.get(nome) as FormArray;
  }

  adicionarGanho(financa: FormArray) {
    (financa.get('ganhos') as FormArray).push(this.createGanhoForm());
  }

  adicionarDespesa(financa: FormArray) {
    (financa.get('ganhos') as FormArray).push(this.createDespesaForm());
  }

  deletarGanho(modal: MatDialogRef<any>, financa: FormArray, index: number) {
    modal.close();
    (financa.get('ganhos') as FormArray).removeAt(index);
  }

  deletarDespesa(modal: MatDialogRef<any>, financa: FormArray, index: number) {
    modal.close();
    (financa.get('despesas') as FormArray).removeAt(index);
  }

  compare(tp1: TipoGanho | TipoDespesa, tp2: TipoGanho | TipoDespesa) {
    return tp1.id === tp2.id;
  }

  editar() {
    this.isEditar = true;
    this.formCopy = { ...this.form.value };
  }

  cancelar() {
    this.data = this.formCopy.financas as Financa[]
    this.isEditar = false;
  }
}
