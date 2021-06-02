import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { Despesa } from 'src/app/models/despesa.model';
import { Financa } from 'src/app/models/financa.model';
import { Ganho } from 'src/app/models/ganho.model';
import { TipoDespesa } from 'src/app/models/tipo-despesa.model';
import { TipoGanho } from 'src/app/models/tipo-ganho.model';
import { TipoDespesaService } from 'src/app/service/tipo-despesa.service';
import { TipoGanhoService } from 'src/app/service/tipo-ganho.service';

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


  @ViewChild(MatTabGroup) matTabGroup: MatTabGroup;

  @Input()
  set data(data: Financa[]) {
    this._data = data;
    this.initForm(data);
    this.selectLastTab(this.data);
  }

  @Output() onTabChanges = new EventEmitter<number>();
  
  @Output() onSalvar = new EventEmitter<Financa>();


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

  ngAfterViewInit(): void {
    this.selectLastTab(this._data);
  }
  

  selectLastTab(financas: Financa[] = []) {
    if (this.matTabGroup) {
      const financaAtualIndex = financas.length -1;
      this.matTabGroup.selectedIndex = financaAtualIndex;
    }
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

  initForm(financas: Financa[]) {
    this.form = this._fb.group({
      financas: this._fb.array(this.initFinancas(financas)),
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
      id: [financa.id ? financa.id : null],
      periodo: [financa ? financa.periodo : ''],
      despesas: this._fb.array(this.initDespesas(financa.despesas)),
      ganhos: this._fb.array(this.initGanhos(financa.ganhos)),
    });
  }

  createGanhoForm(ganho: Ganho = {}) {
    return this._fb.group({
      id: [ganho.id ? ganho.id : null],
      tipo: [ganho.tipo ? ganho.tipo : '', Validators.required],
      valor: [ganho.valor ? ganho.valor : '', Validators.required],
      financa: this._fb.group({
        id: [ganho.financa ? ganho.financa.id : null]
      })
    });
  }

  createDespesaForm(despesa: Despesa = {}) {
    return this._fb.group({
      id: [despesa.id ? despesa.id : null],
      tipo: [despesa.tipo ? despesa.tipo : '', Validators.required],
      valor: [despesa.valor ? despesa.valor : '', Validators.required],
      financa: this._fb.group({
        id: [despesa.financa ? despesa.financa.id : null]
      })
    });
  }

  asFormArray(nome: string, abstractControl: AbstractControl): FormArray {
    return abstractControl.get(nome) as FormArray;
  }

  adicionarGanho(financa: FormControl) {
    const ganho: Ganho = {
      id: null,
      financa: financa.value
    };
    (financa.get('ganhos') as FormArray).push(this.createGanhoForm(ganho));
  }

  adicionarDespesa(financa: FormControl) {
    const despesa: Despesa = {
      id: null,
      financa: financa.value
    };
    (financa.get('despesas') as FormArray).push(this.createDespesaForm(despesa));
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

  salvar(financaControl: FormControl) {
    const financa = financaControl.value
    this.onSalvar.emit(financa);
    this.isEditar = false;

  }

  getMes(mesAno: string) {
    moment.locale('pt-BR');
    return moment(mesAno, 'MM/YYYY').format('MMMM').toUpperCase();
  }

  tabChange(tab: {index: number}) {
    this.onTabChanges.emit(tab.index);
  }
}
