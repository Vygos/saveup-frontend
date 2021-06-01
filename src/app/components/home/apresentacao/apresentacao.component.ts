import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { Financa } from 'src/app/models/financa.model';
import { FinancaService } from 'src/app/service/financa.service';

@Component({
  selector: 'app-apresentacao',
  templateUrl: './apresentacao.component.html',
  styleUrls: ['./apresentacao.component.scss']
})
export class ApresentacaoComponent implements OnInit {

  isLoading = false;

  dados: Financa[];

  todasAsFinancas: Financa[] = [];

  anos: string[];

  anoSelecionado: string;

  totalGanhos: number;
  totalDespesas: number;  
  
  constructor(
    private financaService: FinancaService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'] as number;

      this.isLoading = true;
      forkJoin([
        this.financaService.findAll(id),
        this.financaService.listYears(id)
      ]).subscribe(([financas, anos]) => {
        this.todasAsFinancas = financas;
        this.anos = anos;
        this.filtrarDados(anos[0]);
        this.verificarFinanca(this.todasAsFinancas);
        
        this.isLoading = false;
      })
    })
  }
  
  calcularValores(index: number) {
    const financa = this.dados.find((_financa, i) => i == index);

    // this.totalDespesas = financa.despesas.reduce((acc, value) => acc + value.valor, 0);
    // this.totalGanhos = financa.ganhos.reduce((acc, value) => acc + value.valor, 0);
  }

  verificarFinanca(financas: Financa[]) {
    if (!this.isPossuiFinancaMesAtual(financas)) {
      let mesAno = moment().format('MM/YYYY');
      this.todasAsFinancas.push({
        periodo: mesAno,
        ganhos: [],
        despesas: []
      } as Financa)
    }
  }

  isPossuiFinancaMesAtual(financas: Financa[]): boolean {

    return financas.some((financa) => {
      let mesAnoAtual = moment().format('MM/YYYY');
      return financa.periodo === mesAnoAtual;
    })
  }

  filtrarDados(anoSelecionado: string): void {
    this.anoSelecionado = anoSelecionado;
    this.dados = this.todasAsFinancas.filter(financa => financa.periodo.toString().includes(anoSelecionado));
  }

}
