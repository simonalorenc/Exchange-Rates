import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyListComponent } from './currency-list.component';
import { CurrenciesRepository } from '../data/currencies-repository';
import { CurrencyTranslationService } from '../data/currency.translation.service';
import { FavouritesRatesService } from 'src/app/favourites-rates.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { of } from 'rxjs';

describe('CurrencyListComponent', () => {
  let component: CurrencyListComponent;
  let fixture: ComponentFixture<CurrencyListComponent>;
  let currenciesRepositorySpy = jasmine.createSpyObj('CurrenciesRepository', ['getRatesWithFlags']);
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let currencyTranslationServiceSpy = jasmine.createSpyObj('CurrencyTranslationService', ['getRateWithFlagForLocale']);
  let viewPortScrollerSpy = jasmine.createSpyObj('ViewportScroller', ['scrollToPosition']);
  let favouritesRatesServiceSpy = jasmine.createSpyObj('FavouritesRatesService', ['checkFavourites', 'addToFavourites', 'removeFromFavourites']);

  beforeEach(() => {
    currenciesRepositorySpy.getRatesWithFlags.and.returnValue(of([]));
    TestBed.configureTestingModule({
      declarations: [CurrencyListComponent],
      providers: [
        { provide: CurrenciesRepository, useValue: currenciesRepositorySpy },
        FormBuilder,
        { provide: Router, useValue: routerSpy },
        { provide: CurrencyTranslationService, useValue: currencyTranslationServiceSpy },
        { provide: ViewportScroller, useValue: viewPortScrollerSpy },
        { provide: FavouritesRatesService, useValue: favouritesRatesServiceSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(CurrencyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
