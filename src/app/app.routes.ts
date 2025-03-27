import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/portfolio-dashboard/portfolio-dashboard.module').then(
        (m) => m.PortfolioDashboardModule
      ),
  },
  {
    path: 'investment-details',
    loadChildren: () =>
      import('./features/investment-details/investment-details.module').then(
        (m) => m.InvestmentDetailsModule
      ),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
