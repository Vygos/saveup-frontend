import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-novo-cadastro',
  templateUrl: './novo-cadastro.component.html',
  styleUrls: ['./novo-cadastro.component.scss']
})
export class NovoCadastroComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NovoCadastroComponent>) { }

  ngOnInit(): void {
  }

}
