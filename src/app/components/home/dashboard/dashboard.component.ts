import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as moment from 'moment';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { Chart } from 'src/app/models/chart.model';
import { FinancaService } from 'src/app/service/financa.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userId: number;

  isLoading = false;

  anos: string[];

  anoSelecionado: string;

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
  ) {}

  ngOnInit(): void {
    moment.locale('pt-BR');
    this.load();
  }

  load(): void {
    this.isLoading = true;
    this.activatedRoute.params.subscribe((params) => {
      this.userId = params['id'] as number;

      this.financaService.listYears(this.userId).subscribe((anos) => {
        this.anos = anos[0] ? anos : [moment().format('YYYY')];
        this.anoSelecionado = this.anos[0];

        this.financaService
          .chartData(this.userId, this.anoSelecionado)
          .subscribe((dataCharts) => {
            this.initCharts(dataCharts);
            this.isLoading = false;
          });
      });
    });
  }

  initCharts(dataCharts: Chart[]) {
    if (!dataCharts[0]) {
      this.lineChartLabels = [];
      this.lineChartData = [{ data: [], label: '' }];
      return;
    }

    this.lineChartLabels = dataCharts.reduce((acc, value) => {
      const mes = moment(value.mes, 'MM').format('MMMM');
      return [...acc, mes];
    }, []);

    this.lineChartData = dataCharts.reduce((acc, value) => {
      return [
        {
          data: acc[0]
            ? [...acc[0].data, value.totalGanhos]
            : [value.totalGanhos],
          label: 'Ganhos',
        },

        {
          data: acc[1]
            ? [...acc[1].data, value.totalDespesas]
            : [value.totalDespesas],
          label: 'Despesas',
        },

        {
          data: acc[2]
            ? [...acc[2].data, value.saldoFinal]
            : [value.saldoFinal],
          label: 'Saldo Final',
        },
      ];
    }, []);
  }

  alterarAno({ value: anoSelecionado }): void {
    this.isLoading = true;
    this.anoSelecionado = anoSelecionado;

    this.financaService
      .chartData(this.userId, anoSelecionado)
      .subscribe((dataCharts) => {
        this.initCharts(dataCharts);
        this.isLoading = false;
      });
  }
}
