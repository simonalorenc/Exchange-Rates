import { Component, OnInit } from '@angular/core';
import { ChartService } from '../chart.service';
import { CurrenciesService } from '../currencies/currencies.service';
import { ActivatedRoute } from '@angular/router';
import { DetailRate, ResultOneCurrency } from '../currency';

@Component({
  selector: 'app-chart-from-one-month',
  templateUrl: './chart-from-one-month.component.html',
  styleUrls: ['./chart-from-one-month.component.scss']
})
export class ChartFromOneMonthComponent implements OnInit{
  code!: string
  datesToApi: string[] =[]
  currencyArray!: DetailRate[]
  currencyForOneMonthChart: number[] = [];
  currencyDatesForOneMonthChart: string[] = [];

  constructor(private chartService: ChartService, private currenciesService: CurrenciesService ,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.code = params.get('code') || ''
    })
    this.completeDatesArrayToApi()
    this.completeArrays()
  }

  completeDatesArrayToApi() {
    this.datesToApi = this.currenciesService.getDatesToMonthExchangeRate()
  }

  completeArrays() {
    this.currenciesService.getCurrencyOneMonth(this.code, this.datesToApi[0], this.datesToApi[1]).subscribe(
      (currency) => {
        this.currencyArray = currency.rates
        this.currencyForOneMonthChart = this.currencyArray.map(
          rate => rate.mid
        )
        this.currencyDatesForOneMonthChart = this.currencyArray.map(
          rate => rate.effectiveDate
        )
        console.log(this.currencyDatesForOneMonthChart)
        console.log(this.currencyForOneMonthChart)
        this.chartService.renderChart(this.currencyDatesForOneMonthChart, this.currencyForOneMonthChart, 'chartFormOneMonth')
      }
    )
  }
}
