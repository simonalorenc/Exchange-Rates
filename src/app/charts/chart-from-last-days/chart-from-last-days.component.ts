import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartService } from '../chart.service';
import { ActivatedRoute } from '@angular/router';
import { ExchangeRateService } from 'src/app/currency/data/exchange-rate.service';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-chart-from-last-days',
  templateUrl: './chart-from-last-days.component.html',
  styleUrls: ['./chart-from-last-days.component.scss'],
})
export class ChartFromLastDaysComponent implements OnInit, OnDestroy {
  private NUMBER_OF_LAST_DAYS: number = 30;
  private CHART_ID = 'chartFromLastDays';
  private chart$ = new Subject<void>();

  constructor(
    private chartService: ChartService,
    private exchangeRateService: ExchangeRateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap
    .pipe(takeUntil(this.chart$))
    .subscribe((params) => {
      const code = params.get('code') || '';
      this.createChartFromLastDays(code);
    });
  }

  ngOnDestroy(): void {
    this.chart$.next();
    this.chart$.complete();
  }

  createChartFromLastDays(code: string): void {
    this.exchangeRateService
      .getCurrencyExchangeTableDtoFromLastDays(code, this.NUMBER_OF_LAST_DAYS)
      .subscribe((result) => {
        const chartData = result.rates.map((rate) => rate.mid);
        const chartLabels = result.rates.map((rate) => rate.effectiveDate);
        this.chartService.createChart(chartLabels, chartData, this.CHART_ID);
      });
  }
}
