import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { StoreService } from '@financial-management/store';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-asset-allocation',
  standalone: false,
  templateUrl: './asset-allocation.component.html',
  styleUrl: './asset-allocation.component.scss',
})
export class AssetAllocationComponent implements OnInit, AfterViewInit {
  constructor(private storeService: StoreService, private el: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.renderChart();
  }

  private renderChart(): void {
    const sectorData = this.storeService.getSectorWiseAllocation();
    const totalInvestment = Object.values(sectorData).reduce((sum, val) => sum + val, 0);
    const chartData = Object.keys(sectorData)
      .map((sector) => ({
        name: sector,
        y: (sectorData[sector] / totalInvestment) * 100, // Convert to percentage
      }))
      .sort((a, b) => b.y - a.y); // Sort in descending order

    Highcharts.chart(this.el.nativeElement.querySelector('#sectorChart'), {
      chart: {
        type: 'pie',
        backgroundColor: 'transparent',
      },
      title: {
        text: '',
      },
      tooltip: {
        pointFormat: '<b>{point.y:.2f}%</b>',
      },
      plotOptions: {
        pie: {
          innerSize: '60%',
          dataLabels: {
            enabled: true,
            format: '{point.name}: {point.y:.2f}%',
          },
        },
      },
      series: [
        {
          name: 'Allocation',
          data: chartData,
          type: 'pie',
        },
      ],
      credits: {
        enabled: false,
      },
    });
  }
}
