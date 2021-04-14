import { Component, OnInit } from '@angular/core';
import { TipoGanho } from 'src/app/models/tipo-ganho.model';

@Component({
  selector: 'app-tipo-ganho',
  templateUrl: './tipo-ganho.component.html',
  styleUrls: ['./tipo-ganho.component.scss'],
})
export class TipoGanhoComponent implements OnInit {
  isLoading: boolean = true;

  columnsToDisplay = ['nome', 'ação']

  data: TipoGanho[] = [
    { id: 1, nome: 'Estudo' },
    { id: 2, nome: 'Investimento' },
    { id: 3, nome: 'Apostas' },
    { id: 4, nome: 'Estudo' },
    { id: 5, nome: 'Estudo' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
