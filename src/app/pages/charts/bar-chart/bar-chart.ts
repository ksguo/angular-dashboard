import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BarChartData {
  PassengerId: string;
  PassengerName: string;
  Embarked: string;
  Survived: string;
}

interface ChartData {
  label: string;
  survived: number;
  notSurvived: number;
  total: number;
  survivalRate: number;
}

@Component({
  selector: 'app-bar-chart',
  imports: [CommonModule],
  templateUrl: './bar-chart.html',
  styleUrl: './bar-chart.scss',
})
export class BarChart {
  barChartData = signal<BarChartData[]>([]);
  chartData = signal<ChartData[]>([]);
  maxValue = computed(() => {
    const data = this.chartData();
    return data.length > 0 ? Math.max(...data.map(d => d.total)) : 0;
  });

  async ngOnInit() {
    const data = await fetch('assets/data/mock-data.json').then(res => res.json());
    this.barChartData.set(data);
    this.processChartData();
  }

  processChartData() {
    const embarkedGroups = this.barChartData().reduce((acc, passenger) => {
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
    }, {} as Record<string, { survived: number; notSurvived: number }>);

    const portNames: Record<string, string> = {
      'S': 'Southampton',
      'C': 'Cherbourg',
      'Q': 'Queenstown',
      'Unknown': 'Unknown'
    };

    const processedData = Object.entries(embarkedGroups).map(([port, data]) => {
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
  }

  getBarHeight(value: number): number {
    const max = this.maxValue();
    return max > 0 ? (value / max) * 100 : 0;
  }
}
