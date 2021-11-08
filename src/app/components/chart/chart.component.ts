import { Component, ElementRef, OnInit } from '@angular/core';
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

  constructor(private dataService: DataService,
    private elementRef:ElementRef) {
    Chart.register(...registerables);
  }

  chartdata$: Observable<Array<SamplePerType>> = this.dataService.chartdata$;

  ngOnInit(): void {
   
    this.chartdata$.subscribe(res => {
      this.result = res;
      this.sampleType = this.result.map((sample: SamplePerType) => sample.sampleType);
      this.total = this.result.map((sample: SamplePerType) => sample.total);

      this.renderChart(this.sampleType,this.total);

    });

  }

  renderChart(labels:any, data:any){
    let htmlRef = this.elementRef.nativeElement.querySelector('#mychart');

    this.chart = new Chart(htmlRef, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Total sample Types',
            data: data,
            borderWidth: 1,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)'
          }
        ]
      }
    });
  }
}
