import { Component, OnInit } from '@angular/core';
import { ChartService } from '../chart.service';
import { ExchangeRateService } from '../currencies/exchange-rate.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chart-from-one-month',
  templateUrl: './chart-from-one-month.component.html',
  styleUrls: ['./chart-from-one-month.component.scss'],
})
export class ChartFromOneMonthComponent implements OnInit {
  private NUMBER_OF_LAST_DAYS: number = 30;
  private CHART_ID = 'chartFormOneMonth';

  constructor(
    private chartService: ChartService,
    private currenciesService: ExchangeRateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe((params) => {
      const code = params.get('code') || '';
      this.createChartFromLast30Days(code);
    });
  }

  createChartFromLast30Days(code: string): void {
    this.currenciesService
      .getCurrencyExchangeTableDtoFromLastDays(code, this.NUMBER_OF_LAST_DAYS)
      .subscribe((result) => {
        const chartData = result.rates.map((rate) => rate.mid);
        const chartLabels = result.rates.map((rate) => rate.effectiveDate);
        this.chartService.createChart(chartLabels, chartData, this.CHART_ID);
      });
  }
}
