import { Component, OnInit } from '@angular/core';
import { StoreService } from '@financial-management/store';
import { InvestmentOnAsset } from '../../../../shared/interfaces/global.interface';

@Component({
  selector: 'app-performance-metrics',
  standalone: false,
  templateUrl: './performance-metrics.component.html',
  styleUrl: './performance-metrics.component.scss',
})
export class PerformanceMetricsComponent implements OnInit {
  performanceMetrics: InvestmentOnAsset[] = [];

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.loadPerformanceMetrics();
  }

  private loadPerformanceMetrics(): void {
    this.performanceMetrics = this.storeService.getPerformanceMetrics();
  }
}
