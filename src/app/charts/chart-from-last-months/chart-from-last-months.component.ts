import { Component } from '@angular/core';
import { ChartService } from '../chart.service';
import { ActivatedRoute } from '@angular/router';
import { ExchangeRateService } from 'src/app/currency/data/exchange-rate.service';
import { groupBy, mergeMap, of, toArray, zip } from 'rxjs';
import { DatesService } from 'src/app/dates.service';

@Component({
  selector: 'app-chart-from-last-months',
  templateUrl: './chart-from-last-months.component.html',
  styleUrls: ['./chart-from-last-months.component.scss']
})
export class ChartFromLastMonthsComponent {
  private CHART_ID: string = 'chartFormLastMonths'

  constructor(
    private route: ActivatedRoute,
    private chartService: ChartService, 
    private exchangeRateService: ExchangeRateService,
    private datesService: DatesService 
  ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      const code = params.get('code') || ''
      this.createChartFromLastMonths(code)
    })
  }

  createChartFromLastMonths(code: string): void {
    const dates = this.getStartAndEndDate()

    this.exchangeRateService.getCurrencyExchangeTableDtoForDateRange(code, dates[0], dates[1]).pipe(
      mergeMap(result => result.rates),
      groupBy(rate => {
        const date = new Date(rate.effectiveDate)
        return date.getMonth()
      }),
      mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
      toArray()
    ).subscribe(grouped => {
      const labels: string[] = []
      const values: number[] = []
      grouped.forEach(group => {
        const groupMonth = group[0] + 1
        labels.push(groupMonth.toString())
        const groupAverage = group[1].reduce((acc, current) => acc + current.mid, 0) / group[1].length
        values.push(groupAverage)
      })
      this.chartService.createChart(labels, values, this.CHART_ID)
    })
  }

  private getStartAndEndDate(): string[] {
    const todayDate = new Date()
    const endDateString = this.datesService.getFormattedDate(todayDate)
    const startDate = todayDate
    startDate.setMonth(todayDate.getMonth() - 2)
    startDate.setDate(1)
    const startDateString = this.datesService.getFormattedDate(startDate)
    return [startDateString, endDateString]
  }
}
