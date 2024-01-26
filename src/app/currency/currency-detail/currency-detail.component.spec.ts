import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyDetailComponent } from './currency-detail.component';
import { CurrenciesRepository } from '../data/currencies-repository';
import { CurrencyTranslationService } from '../data/currency.translation.service';
import { FavouritesRatesService } from 'src/app/favourites-rates.service';
import { FlagsService } from '../data/flags.service';
import { ExchangeRateService } from '../data/exchange-rate.service';
import { DatesService } from 'src/app/dates.service';
import { ActivatedRoute } from '@angular/router';

describe('CurrencyDetailComponent', () => {
  let component: CurrencyDetailComponent;
  let fixture: ComponentFixture<CurrencyDetailComponent>;
  let activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['get']);
  let exchangeRateServiceSpy = jasmine.createSpyObj('ExchangeRateService', ['getCurrencyExchangeTableDtoForDateRange']);
  let flagsServiceSpy = jasmine.createSpyObj('FlagsService', ['getFlagUrl']);
  let currenciesRepositorySpy = jasmine.createSpyObj('CurrenciesRepository', ['getCountryCode']);
  let currencyTranslationServiceSpy = jasmine.createSpyObj('CurrencyTranslationService', ['updateDetailCurrency']);
  let favouritesRatesServiceSpy = jasmine.createSpyObj('FavouritesRatesService', ['checkIfRateIsInFavourites', 'removeFromFavourites', 'addToFavourites']);
  let datesServiceSpy = jasmine.createSpyObj('DatesService', ['getStartAndEndDate', 'getAllFormattedDatesBetweenRange', 'getFormattedDate']);

  // private route: ActivatedRoute,
  //   private exchangeRateService: ExchangeRateService,
  //   private flagsService: FlagsService,
  //   private currenciesRepository: CurrenciesRepository,
  //   private router: Router,
  //   @Inject(LOCALE_ID) public locale: string,
  //   private currencyTranslationService: CurrencyTranslationService,
  //   private favouritesRatesService: FavouritesRatesService,
  //   private viewportScroller: ViewportScroller,
  //   private datesService: DatesService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: ExchangeRateService, useValue: exchangeRateServiceSpy },
        { provide: FlagsService, useValue: flagsServiceSpy },
        { provide: CurrenciesRepository, useValue: currenciesRepositorySpy },
        { provide: CurrencyTranslationService, useValue: currencyTranslationServiceSpy },
        { provide: FavouritesRatesService, useValue: favouritesRatesServiceSpy },
        { provide: DatesService, useValue: datesServiceSpy },
      ],
    });
    fixture = TestBed.createComponent(CurrencyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
