import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import * as Highcharts from 'highcharts';
import { DashboardContainerComponent } from './components/dashboard-container/dashboard-container.component';
import { MarketTrendComponent } from './components/market-trend/market-trend.component';
import { AssetAllocationComponent } from './components/asset-allocation/asset-allocation.component';
import { PerformanceMetricsComponent } from './components/performance-metrics/performance-metrics.component';

const routes: Routes = [{ path: '', component: DashboardContainerComponent }];

@NgModule({
  declarations: [
    DashboardContainerComponent,
    MarketTrendComponent,
    AssetAllocationComponent,
    PerformanceMetricsComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class PortfolioDashboardModule {}
