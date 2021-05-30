import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  todasAsFinancas: Financa[];

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
      })
    })
  }

  alterarDados({value: anoSelecionado}) {
    this.dados = this.todasAsFinancas.filter(financa => financa.periodo.toString().includes(anoSelecionado));
  }
}
