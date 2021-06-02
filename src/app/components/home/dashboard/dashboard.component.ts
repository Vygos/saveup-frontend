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
            color: 'rgba(0, 9, 0, 0.3)',
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
          borderColor: 'black',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'black',
            content: 'LineAnno',
          },
        },
      ],
    },
  };

  lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(0, 255, 96, 0.2)',
      borderColor: 'rgba(60, 179, 113)',
      pointBackgroundColor: 'rgba(60, 179, 113)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(60, 179, 113)',
    },
    {
      backgroundColor: 'rgba(255, 0, 0, 0.7)',
      borderColor: 'rgba(255, 0, 0)',
      pointBackgroundColor: 'rgba(255, 0, 0)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255, 0, 0, 0.7)',
    },
    {
      backgroundColor: 'rgba(0, 122, 255, 0.6)',
      borderColor: 'rgba(0, 122, 255, 0.9)',
      pointBackgroundColor: 'rgba(0, 122, 255, 0.6)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0, 122, 255, 0.9)',
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
     
      this.financaService.listYears(id).subscribe(anos => {
        this.anos = anos;
        
      })

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
