import { Component, signal, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent } from 'chart.js';

interface ChartDataStats {
  label: string;
  survived: number;
  notSurvived: number;
  total: number;
  survivalRate: number;
}

@Component({
  selector: 'app-bar-chart',
  imports: [BaseChartDirective],
  templateUrl: './bar-chart.html',
  styleUrl: './bar-chart.scss',
})
export class BarChart {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;

  chartData = signal<ChartDataStats[]>([]);

  public barChartType = 'bar' as const;

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false
        }
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: '泰坦尼克号乘客生存分析 - 按登船港口',
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += context.parsed.y;
            return label;
          }
        }
      }
    }
  };

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: '生存',
        data: [],
        backgroundColor: '#4caf50',
        hoverBackgroundColor: '#45a049',
      },
      {
        label: '遇难',
        data: [],
        backgroundColor: '#f44336',
        hoverBackgroundColor: '#da190b',
      }
    ]
  };

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    const rawData = await fetch('assets/data/mock-data.json').then(res => res.json());

    const embarkedGroups = rawData.reduce((acc: any, passenger: any) => {
      const port = passenger.Embarked || 'Unknown';
      if (!acc[port]) {
        acc[port] = { survived: 0, notSurvived: 0 };
      }

      if (passenger.Survived === '1') {
        acc[port].survived++;
      } else {
        acc[port].notSurvived++;
      }

      return acc;
    }, {});

    const portNames: Record<string, string> = {
      'S': 'Southampton',
      'C': 'Cherbourg',
      'Q': 'Queenstown',
      'Unknown': 'Unknown'
    };

    const processedData = Object.entries(embarkedGroups).map(([port, data]: [string, any]) => {
      const total = data.survived + data.notSurvived;
      return {
        label: portNames[port] || port,
        survived: data.survived,
        notSurvived: data.notSurvived,
        total,
        survivalRate: (data.survived / total) * 100
      };
    });

    this.chartData.set(processedData);

    // 更新 Chart.js 数据
    this.barChartData.labels = processedData.map(d => d.label);
    this.barChartData.datasets[0].data = processedData.map(d => d.survived);
    this.barChartData.datasets[1].data = processedData.map(d => d.notSurvived);

    this.chart?.update();
  }


}
