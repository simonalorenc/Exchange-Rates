import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyRate } from '../data/currency-exchange-table-dto';
import { ExchangeRateService } from '../data/exchange-rate.service';
import { FlagsService } from '../data/flags.service';
import { CurrenciesRepository } from '../data/currencies-repository';
import { ActiveChart } from '../data/active-chart.enum';
import { CurrencyTranslationService } from '../data/currency.translation.service';
import {
  IconDefinition,
  faHeart as farHeart,
} from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { FavouritesRatesService } from 'src/app/favourites-rates.service';
import { ViewportScroller } from '@angular/common';
import { DatesService } from 'src/app/dates.service';

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.scss'],
})
export class CurrencyDetailComponent implements OnInit {
  ActiveChart = ActiveChart;
  name!: string;
  code!: string;
  flagUrl!: string;
  detailCurrencyRates: CurrencyRate[] = [];
  activeChart: ActiveChart = ActiveChart.LastSevenDays;
  heartIcon: IconDefinition = farHeart;
  isRateInFavourites: boolean = false;
  dates: string[] = [];
  currentPage: number = 1;

  constructor(
    private route: ActivatedRoute,
    private exchangeRateService: ExchangeRateService,
    private flagsService: FlagsService,
    private currenciesRepository: CurrenciesRepository,
    private router: Router,
    @Inject(LOCALE_ID) public locale: string,
    private currencyTranslationService: CurrencyTranslationService,
    private favouritesRatesService: FavouritesRatesService,
    private viewportScroller: ViewportScroller,
    private datesService: DatesService
  ) {
    this.code = this.route.snapshot.paramMap.get('code')!;
  }

  ngOnInit(): void {
    this.getCurrencyDetailsAndFlagUrl();
    this.isRateInFavourites =
      this.favouritesRatesService.checkIfRateIsInFavourites(this.code);
    this.heartIcon = this.isRateInFavourites ? fasHeart : farHeart;
  }

  private getCurrencyDetailsAndFlagUrl(): void {
    const countryCode = this.currenciesRepository.getCountryCode(this.code);
    this.dates = this.datesService.getStartAndEndDate(6)
    this.flagUrl = this.flagsService.getFlagUrl(countryCode);
    this.displayExchangeRates()
  }

  // private getCurrencyDetails(code: string): void {
  //   this.dates = this.datesService.getStartAndEndDate(6)
  //   this.exchangeRateService.getCurrencyExchangeTableDtoForDateRange(code, this.dates[0], this.dates[1])
  //     .subscribe((result) => {
  //       this.name = result.currency
  //       this.displayExchangeRates()
  //     })
  // }

  displayExchangeRates() {
    this.exchangeRateService.getCurrencyExchangeTableDtoForDateRange(this.code, this.dates[0], this.dates[1]).subscribe((currencyResult) => {
      this.name = currencyResult.currency
      
      const allDates = this.getAllDatesInRange()
      const exchangeRatesMap = new Map<string, number>()
      currencyResult.rates.forEach(dto => {
        const currency = new CurrencyRate(dto)
        exchangeRatesMap.set(currency.date, currency.mid)
      })
      this.detailCurrencyRates = allDates.reverse().map(date => ({
        date: date,
        mid: exchangeRatesMap.get(date) !== undefined ? exchangeRatesMap.get(date)! : -1
      }))
    })
  }

  //TODO przenieść do serwisu
  getAllDatesInRange() {
    const allDates: string[] = []
    let currentDate = new Date(this.dates[0])
    const endDateObj = new Date(this.dates[1])
    while (currentDate <= endDateObj) {
      allDates.push(this.datesService.getFormattedDate(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
    return allDates
  }

  onPageChangePrevious() {
    this.currentPage = this.currentPage - 1;
    this.getDates(this.currentPage)
  }

  onPageChangeNext() {
    this.currentPage = this.currentPage + 1;
    this.getDates(this.currentPage)
  }

  getDates(pageNumber: number) {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - (pageNumber - 1) * 7);
    const endDateString = this.datesService.getFormattedDate(endDate);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - pageNumber * 7 + 1);
    const startDateString = this.datesService.getFormattedDate(startDate);

    this.dates = [startDateString, endDateString];
    this.displayExchangeRates();
  }

  changePageToFirst() {
    this.currentPage = 1
    this.getCurrencyDetailsAndFlagUrl()
  }

  isChartFromLastSevenDaysActive(): void {
    this.activeChart = ActiveChart.LastSevenDays;
    this.router.navigate([`detail/${this.code}/chart-from-last-seven-days`]);
    this.viewportScroller.scrollToAnchor('chartView');
  }

  isChartFromLastDaysActive(): void {
    this.activeChart = ActiveChart.Last30Days;
    this.router.navigate([`detail/${this.code}/chart-from-last-days`]);
    this.viewportScroller.scrollToAnchor('chartView');
  }

  isChartFromLastMonthsActive(): void {
    this.activeChart = ActiveChart.LastMonths;
    this.router.navigate([`detail/${this.code}/chart-from-last-months`]);
    this.viewportScroller.scrollToAnchor('chartView');
  }

  heartIconClick(code: string): void {
    if (this.isRateInFavourites) {
      this.isRateInFavourites = false
      this.favouritesRatesService.removeFromFavourites(code);
      this.heartIcon = farHeart
    } else {
      this.isRateInFavourites = true
      this.favouritesRatesService.addToFavourites(code);
      this.heartIcon = fasHeart
    }
  }
}
