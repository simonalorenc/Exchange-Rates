import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyDetailComponent } from './currency-detail.component';
import { CurrenciesRepository } from '../data/currencies-repository';
import { CurrencyTranslationService } from '../data/currency.translation.service';
import { FavouritesRatesService } from 'src/app/favourites-rates.service';
import { FlagsService } from '../data/flags.service';
import { ExchangeRateService } from '../data/exchange-rate.service';
import { DatesService } from 'src/app/dates.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { Observable, of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';

describe('CurrencyDetailComponent', () => {
  let component: CurrencyDetailComponent;
  let fixture: ComponentFixture<CurrencyDetailComponent>;
  let activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [
    'get',
    'snapshot',
  ]);
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let exchangeRateServiceSpy = jasmine.createSpyObj('ExchangeRateService', [
    'getCurrencyExchangeTableDtoForDateRange',
  ]);
  let flagsServiceSpy = jasmine.createSpyObj('FlagsService', ['getFlagUrl']);
  let currenciesRepositorySpy = jasmine.createSpyObj('CurrenciesRepository', [
    'getCountryCode',
  ]);
  let currencyTranslationServiceSpy = jasmine.createSpyObj(
    'CurrencyTranslationService',
    ['updateDetailCurrency']
  );
  let favouritesRatesServiceSpy = jasmine.createSpyObj(
    'FavouritesRatesService',
    ['checkIfRateIsInFavourites', 'removeFromFavourites', 'addToFavourites']
  );
  let datesServiceSpy = jasmine.createSpyObj('DatesService', [
    'getStartAndEndDate',
    'getAllFormattedDatesBetweenRange',
    'getFormattedDate',
  ]);
  let viewportScrolleSpy = jasmine.createSpyObj('ViewportScroller', [
    'scrollToAnchor',
  ]);
  let authServiceSpy = jasmine.createSpyObj('AuthService', [
    'isLoggedObservable',
  ]);
  let modalServiceSpy = jasmine.createSpyObj('BsModalService', [
    'show',
    'hide',
  ]);

  beforeEach(() => {
    datesServiceSpy.getStartAndEndDate.and.returnValue([])
    exchangeRateServiceSpy.getCurrencyExchangeTableDtoForDateRange.and.returnValue(of([]))
    activatedRouteSpy.snapshot = {
      paramMap: {
        get: (key: string) => 'some-value', // Mocking paramMap
      },
    };
    authServiceSpy.isLoggedObservable.and.returnValue(of(true));
    TestBed.configureTestingModule({
      declarations: [CurrencyDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ExchangeRateService, useValue: exchangeRateServiceSpy },
        { provide: FlagsService, useValue: flagsServiceSpy },
        { provide: CurrenciesRepository, useValue: currenciesRepositorySpy },
        {
          provide: CurrencyTranslationService,
          useValue: currencyTranslationServiceSpy,
        },
        {
          provide: FavouritesRatesService,
          useValue: favouritesRatesServiceSpy,
        },
        { provide: DatesService, useValue: datesServiceSpy },
        { provide: ViewportScroller, useValue: viewportScrolleSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: BsModalService, useValue: modalServiceSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(CurrencyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should change to next page', () => {
    component.currentPage = 7
    component.onPageChangeNext()
    expect(component.currentPage).toEqual(8);
  });

  it('should change to previous page', () => {
    component.currentPage = 7
    component.onPageChangePrevious()
    expect(component.currentPage).toEqual(6);
  });
});
