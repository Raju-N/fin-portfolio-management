import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { InvestmentFormComponent } from './components/investment-form/investment-form.component';
import { NgxBootstrapImportsModule } from '../../shared/ngx-bootstrap-imports.module';

const routes: Routes = [{ path: '', component: InvestmentFormComponent }];

@NgModule({
  declarations: [InvestmentFormComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    NgxBootstrapImportsModule,
  ],
  providers: [],
})
export class InvestmentDetailsModule {}
