import { Component, OnInit } from '@angular/core';
import { dados } from './apresentacao.mock';

@Component({
  selector: 'app-apresentacao',
  templateUrl: './apresentacao.component.html',
  styleUrls: ['./apresentacao.component.scss']
})
export class ApresentacaoComponent implements OnInit {

  isLoading: boolean = false;

  dados = dados;

  constructor() { }

  ngOnInit(): void {

  }

}
