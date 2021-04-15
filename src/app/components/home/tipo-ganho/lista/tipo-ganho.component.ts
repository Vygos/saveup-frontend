import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TipoGanho } from 'src/app/models/tipo-ganho.model';
import { NovoCadastroComponent } from '../novo-cadastro/novo-cadastro.component';

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
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openModal() {
    this.dialog.open(NovoCadastroComponent, {
      width: '500px'
    })
  }
}
