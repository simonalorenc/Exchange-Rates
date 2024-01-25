import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { GoldPricesComponent } from '../gold-prices/gold-prices.component';
import { CurrencyDetailComponent } from '../currency/currency-detail/currency-detail.component';
import { ChartFromLastSevenDaysComponent } from '../charts/chart-from-last-seven-days/chart-from-last-seven-days.component';
import { ChartFromLastMonthsComponent } from '../charts/chart-from-last-months/chart-from-last-months.component';
import { CurrencyListComponent } from '../currency/currency-list/currency-list.component';
import { ChartFromLastDaysComponent } from '../charts/chart-from-last-days/chart-from-last-days.component';
import { CurrencyConverterComponent } from '../currency/currency-converter/currency-converter.component.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard/currency-list', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'currency-list', component: CurrencyListComponent },
      { path: 'currency-converter', component: CurrencyConverterComponent},
      { path: 'gold-prices', component: GoldPricesComponent },
    ],
  },
  { path: 'detail/:code', redirectTo: 'detail/:code/chart-from-last-seven-days', pathMatch: 'full' },
  { path: 'detail/:code', component: CurrencyDetailComponent,
    children: [
      { path: 'chart-from-last-seven-days', component: ChartFromLastSevenDaysComponent },
      { path: 'chart-from-last-months', component: ChartFromLastMonthsComponent },
      { path: 'chart-from-last-days', component: ChartFromLastDaysComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
