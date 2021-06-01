import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabGroup } from '@angular/material/tabs';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { Despesa } from 'src/app/models/despesa.model';
import { Financa } from 'src/app/models/financa.model';
import { Ganho } from 'src/app/models/ganho.model';
import { TipoDespesa } from 'src/app/models/tipo-despesa.model';
import { TipoGanho } from 'src/app/models/tipo-ganho.model';
import { AuthorizationService } from 'src/app/service/authorization.service';
import { FinancaService } from 'src/app/service/financa.service';
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
  isLoading: boolean = false;


  @ViewChild(MatTabGroup) matTabGroup: MatTabGroup;

  @Input()
  set data(data: Financa[]) {
    this._data = data;
    this.initForm(data);
    this.selectLastTab(this.data);
  }

  @Output() onTabChanges = new EventEmitter<number>()

  constructor(
    private _fb: FormBuilder,
    private tipoGanhoService: TipoGanhoService,
    private tipoDespesaService: TipoDespesaService,
    private authorizationService: AuthorizationService,
    private financaService: FinancaService,
    private snackBar: MatSnackBar
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
    (financa.get('despesas') as FormArray).push(this.createDespesaForm());
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
    this.isLoading = true;
    const financa = financaControl.value
    financa.usuario = this.authorizationService.getLoggedUser();

    console.log("Financa", financa)
    
    this.financaService.create(financa)
      .subscribe(() => {
        this.showSnackBar('Dados cadastrados com sucesso')
      }).add(() => {
        this.isEditar = false;
        this.isLoading = false;
      })
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }

  getMes(mesAno: string) {
    moment.locale('pt-BR');
    return moment(mesAno, 'MM/YYYY').format('MMMM').toUpperCase();
  }

  tabChange(tab: {index: number}) {
    this.onTabChanges.emit(tab.index);
  }
}
