import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @ViewChild(MatDrawer) matDrawer: MatDrawer;

  constructor() { }


  @Input()
  usuario: Usuario

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

}
