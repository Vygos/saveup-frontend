import { Component, Input } from '@angular/core';
import { Despesa } from 'src/app/models/despesa.model';
import { Ganho } from 'src/app/models/ganho.model';

@Component({
  selector: 'tab-view-months',
  templateUrl: './tab-view-months.component.html',
  styleUrls: ['./tab-view-months.component.scss'],
})
export class TabViewMonthsComponent {

  @Input() data: { mes: string; ganhos: Ganho[], despesas: Despesa[] }[];

  constructor() {}

  ngOnInit(): void {
    console.log("DATA", this.data);
  }
}
