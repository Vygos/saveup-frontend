import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { Financa } from 'src/app/models/financa.model';
import { FinancaService } from 'src/app/service/financa.service';
import { dados } from './apresentacao.mock';

@Component({
  selector: 'app-apresentacao',
  templateUrl: './apresentacao.component.html',
  styleUrls: ['./apresentacao.component.scss']
})
export class ApresentacaoComponent implements OnInit {

  isLoading = false;

  dados: Financa[] = dados;

  todasAsFinancas: Financa[] = [];

  anos: string[];
  
  constructor(
    private financaService: FinancaService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'] as number;

      this.isLoading = true;
      forkJoin([
        this.financaService.findAll(id),
        this.financaService.listYears(id)
      ]).subscribe(([financas, anos]) => {
        this.todasAsFinancas = financas;
        this.anos = anos;
        this.isLoading = false;
        this.verificarFinanca(this.todasAsFinancas);
      })
    })
  }

  verificarFinanca(financas: Financa[]) {
    if (!this.isPossuiFinancaMesAtual(financas)) {
      let date = new Date();
      let mesAno = `${date.getMonth()}/${date.getFullYear()}`
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


  alterarDados({value: anoSelecionado}) {
    this.dados = this.todasAsFinancas.filter(financa => financa.periodo.toString().includes(anoSelecionado));
  }
}
