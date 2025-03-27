import { Component, Input } from '@angular/core';
import { StoreService } from '@financial-management/store';

@Component({
  selector: 'app-market-trend',
  standalone: false,
  templateUrl: './market-trend.component.html',
  styleUrl: './market-trend.component.scss',
})
export class MarketTrendComponent {
  marketTrend: { totalMarketValue: number; totalProfitLoss: number } = { totalMarketValue: 0, totalProfitLoss: 0 };

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.marketTrend = this.storeService.getMarketTrend();
  }
}
