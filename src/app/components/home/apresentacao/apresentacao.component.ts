import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Financa } from 'src/app/models/financa.model';
import { FinancaService } from 'src/app/service/financa.service';
import { dados } from './apresentacao.mock';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

@Component({
  selector: 'app-apresentacao',
  templateUrl: './apresentacao.component.html',
  styleUrls: ['./apresentacao.component.scss']
})
export class ApresentacaoComponent implements OnInit {

  isLoading: boolean = false;

  dados: Financa[];

  anos: string[];
  
  constructor(
    private financaService: FinancaService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'] as number;

      this.financaService.listYears(id).subscribe(anos => {
        this.anos = anos;
      })

      this.financaService.findAll(id).subscribe(financas => {
        this.dados = financas;
      })
    })
  }
}
