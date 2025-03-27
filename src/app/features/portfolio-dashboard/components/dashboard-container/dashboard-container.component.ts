import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoreService } from '@financial-management/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-container',
  standalone: false,
  templateUrl: './dashboard-container.component.html',
  styleUrl: './dashboard-container.component.scss',
})
export class DashboardContainerComponent implements OnInit, OnDestroy {
  private portfolioUpdateSubscription!: Subscription;

  assetAllocation: any;
  performanceMetrics: any;
  marketTrend: any;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.portfolioUpdateSubscription = this.storeService.onPortfolioUpdate.subscribe(() => this.fetchWidgetsData());
  }

  fetchWidgetsData() {
    // Any Realtime refreshment need to be done
  }

  ngOnDestroy(): void {
    this.portfolioUpdateSubscription.unsubscribe();
  }
}
