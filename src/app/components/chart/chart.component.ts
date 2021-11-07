import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Observable } from 'rxjs';
import { SamplePerType } from 'src/app/models/samplespertype';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  result: any;
  sampleType: any;
  total: any;
  chart: any = [];

  constructor(private dataService: DataService) {
    Chart.register(...registerables);
  }

  chartdata$: Observable<Array<SamplePerType>> = this.dataService.chartdata$;

  ngOnInit(): void {

    this.chartdata$.subscribe(res => {
      this.result = res;
      this.sampleType = this.result.map((sample: SamplePerType) => sample.sampleType);
      this.total = this.result.map((sample: SamplePerType) => sample.total);

      if (this.chart) {
        this.chart = new Chart('mychart', {
          type: 'bar',
          data: {
            labels: this.sampleType,
            datasets: [
              {
                label: 'Total sample Types',
                data: this.total,
                borderWidth: 1,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)'
              }
            ]
          }
        });

        // // Destroys a specific chart instance
        this.chart.destroy();

      }

      this.chart = new Chart('mychart', {
        type: 'bar',
        data: {
          labels: this.sampleType,
          datasets: [
            {
              label: 'Total sample Types',
              data: this.total,
              borderWidth: 1,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)'
            }
          ]
        }
      });

    });

  }

   removeData(chart:any) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset:any) => {
        dataset.data.pop();
    });
    chart.update();
}

 addData(chart:any, label:any, data:any) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset:any) => {
        dataset.data.push(data);
    });
    chart.update();
}

}
