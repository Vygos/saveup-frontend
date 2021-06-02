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

  userId: number;

  isLoading = false;

  financas: Financa[];

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
      this.userId = params['id'] as number;

      this.isLoading = true;
      this.financaService.listYears(this.userId).subscribe(anos => {
        this.anos = anos;
        this.anoSelecionado = anos[0];

        this.financaService.findByYear(this.userId, this.anoSelecionado).subscribe(financas => {
          this.financas = financas;
          this.verificarFinanca(this.financas);
          this.isLoading = false;
        })
      })
    })
  }

  calcularValores(index: number) {
    const financa = this.financas.find((_financa, i) => i == index);

    this.totalDespesas = financa.despesas.reduce((acc, value) => acc + value.valor, 0);
    this.totalGanhos = financa.ganhos.reduce((acc, value) => acc + value.valor, 0);
  }

  verificarFinanca(financas: Financa[]) {
    if (!this.isPossuiFinancaMesAtual(financas)) {
      let mesAno = moment().format('MM/YYYY');
      this.financas.push({
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

  alterarAno(anoSelecionado: string): void {
    this.isLoading = true;
    this.anoSelecionado = anoSelecionado;

    this.financaService.findByYear(this.userId, this.anoSelecionado).subscribe(financas => {
      this.financas = financas;
      this.calcularValores(0);

      if(this.isAnoExiste(new Date().getFullYear().toString())) {
        this.verificarFinanca(this.financas);
      }

      this.isLoading = false;
    })
  }

  isAnoExiste(ano: string): boolean {
    return this.financas.some(financas => financas.periodo.toString().includes(ano));
  }

}
