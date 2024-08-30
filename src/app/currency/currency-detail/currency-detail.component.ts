import {
  Component,
  Inject,
  LOCALE_ID,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
import { AuthService } from 'src/app/auth.service';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalComponent } from 'src/app/modal/modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.scss'],
})
export class CurrencyDetailComponent implements OnInit, OnDestroy {
  ActiveChart = ActiveChart;
  isLogged: boolean = false;
  name!: string;
  code!: string;
  flagUrl!: string;
  detailCurrencyRates: CurrencyRate[] = [];
  activeChart: ActiveChart = ActiveChart.LastSevenDays;
  heartIcon: IconDefinition = farHeart;
  isRateInFavourites: boolean = false;
  dates: string[] = [];
  currentPage: number = 1;
  private NUMBER_ITEMS_ON_PAGE: number = 7;
  isLoggedSubscription!: Subscription;
  currencyDtoSubscription!: Subscription;

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
    private datesService: DatesService,
    private authService: AuthService,
    private modalService: BsModalService
  ) {
    this.code = this.route.snapshot.paramMap.get('code')!;
    this.isLoggedSubscription = this.authService
      .isLoggedObservable()
      .subscribe((res) => (this.isLogged = res));
  }

  ngOnInit(): void {
    this.getCurrencyDetailsAndFlagUrl();
    this.favouritesRatesService
      .checkIfRateIsInFavourites(this.code)
      .subscribe((isFavourite) => {
        this.isRateInFavourites = isFavourite;
        this.heartIcon = this.isRateInFavourites ? fasHeart : farHeart;
      });
  }

  ngOnDestroy(): void {
    this.isLoggedSubscription?.unsubscribe;
    this.currencyDtoSubscription?.unsubscribe;
  }

  private getCurrencyDetailsAndFlagUrl(): void {
    const countryCode = this.currenciesRepository.getCountryCode(this.code);
    this.dates = this.datesService.getStartAndEndDate(
      this.NUMBER_ITEMS_ON_PAGE
    );
    this.flagUrl = this.flagsService.getFlagUrl(countryCode);
    this.displayExchangeRates();
  }

  private displayExchangeRates() {
    this.currencyDtoSubscription = this.exchangeRateService
      .getCurrencyExchangeTableDtoForDateRange(
        this.code,
        this.dates[0],
        this.dates[1]
      )
      .subscribe((currencyResult) => {
        this.name = this.currencyTranslationService.updateDetailCurrency(
          this.locale,
          currencyResult
        );
        const allDates = this.datesService.getAllFormattedDatesBetweenRange(
          new Date(this.dates[0]),
          new Date(this.dates[1])
        );
        const exchangeRatesMap = new Map<string, number>();
        currencyResult.rates.forEach((dto) => {
          const currency = new CurrencyRate(dto);
          exchangeRatesMap.set(currency.date, currency.mid);
        });
        this.detailCurrencyRates = allDates.reverse().map((date) => ({
          date: date,
          mid:
            exchangeRatesMap.get(date) !== undefined
              ? exchangeRatesMap.get(date)!
              : -1,
        }));
      });
  }

  public onPageChangePrevious() {
    this.currentPage = this.currentPage - 1;
    this.dates = this.getDates(this.currentPage);
    this.displayExchangeRates();
  }

  public onPageChangeNext() {
    this.currentPage = this.currentPage + 1;
    this.dates = this.getDates(this.currentPage);
    this.displayExchangeRates();
  }

  private getDates(pageNumber: number) {
    const endDate = new Date();
    endDate.setDate(
      endDate.getDate() - (pageNumber - 1) * this.NUMBER_ITEMS_ON_PAGE
    );
    const endDateString = this.datesService.getFormattedDate(endDate);

    const startDate = new Date();
    startDate.setDate(
      startDate.getDate() - pageNumber * this.NUMBER_ITEMS_ON_PAGE + 1
    );
    const startDateString = this.datesService.getFormattedDate(startDate);

    return [startDateString, endDateString];
  }

  public changePageToFirst() {
    this.currentPage = 1;
    this.getCurrencyDetailsAndFlagUrl();
  }

  public isChartFromLastSevenDaysActive(): void {
    this.activeChart = ActiveChart.LastSevenDays;
    this.router.navigate([`detail/${this.code}/chart-from-last-seven-days`]);
    this.viewportScroller.scrollToAnchor('chartView');
  }

  public isChartFromLastDaysActive(): void {
    this.activeChart = ActiveChart.Last30Days;
    this.router.navigate([`detail/${this.code}/chart-from-last-days`]);
    this.viewportScroller.scrollToAnchor('chartView');
  }

  public isChartFromLastMonthsActive(): void {
    this.activeChart = ActiveChart.LastMonths;
    this.router.navigate([`detail/${this.code}/chart-from-last-months`]);
    this.viewportScroller.scrollToAnchor('chartView');
  }

  public heartIconClick(code: string): void {
    if (this.isLogged) {
      if (this.isRateInFavourites) {
        this.isRateInFavourites = false;
        this.favouritesRatesService.removeFromFavourites(code);
        this.heartIcon = farHeart;
      } else {
        this.isRateInFavourites = true;
        this.favouritesRatesService.addToFavourites(code);
        this.heartIcon = fasHeart;
      }
    } else {
      const options: ModalOptions = {
        initialState: {
          message: 'Login to add to favourites!',
        },
      };
      this.modalService.show(ModalComponent, options);
    }
  }
}
