import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as moment from 'moment';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { FinancaService } from 'src/app/service/financa.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  isLoading = false;

  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];

  public lineChartType: ChartType = 'line';

  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'black',
          },
        },
      ],
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno',
          },
        },
      ],
    },
  };

  lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    },
  ];

  constructor(
    private financaService: FinancaService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    moment.locale('pt-BR');

    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];

      this.financaService.chartData(id, "2021").subscribe(dataCharts => {

        this.lineChartLabels = dataCharts.reduce((acc, value) => {
          const mes = moment(value.mes, 'MM').format('MMMM');
          return [...acc, mes]
        }, [])

        this.lineChartData = dataCharts.reduce((acc, value) => {
          return [
            {
              data: acc[0] ? [...acc[0].data, value.totalGanhos] : [value.totalGanhos],
              label: 'Ganhos'
            },

            {
              data: acc[1] ? [...acc[1].data, value.totalDespesas] : [value.totalDespesas],
              label: 'Despesas'
            },

            {
              data: acc[2] ? [...acc[2].data, value.saldoFinal] : [value.saldoFinal],
              label: 'Saldo Final'
            }]
        }, [])

        this.isLoading = false;
      })
    });
  }
}
