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
import { AuthService } from 'src/app/auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';

describe('CurrencyListComponent', () => {
  let component: CurrencyListComponent;
  let fixture: ComponentFixture<CurrencyListComponent>;
  let currenciesRepositorySpy = jasmine.createSpyObj('CurrenciesRepository', [
    'getRatesWithFlags',
  ]);
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let currencyTranslationServiceSpy = jasmine.createSpyObj(
    'CurrencyTranslationService',
    ['getRateWithFlagForLocale']
  );
  let viewPortScrollerSpy = jasmine.createSpyObj('ViewportScroller', [
    'scrollToPosition',
  ]);
  let favouritesRatesServiceSpy = jasmine.createSpyObj(
    'FavouritesRatesService',
    ['checkFavourites', 'addToFavourites', 'removeFromFavourites']
  );
  let authServiceSpy = jasmine.createSpyObj('AuthService', [
    'isLoggedObservable',
    'messageAsObservable',
    'clearMessage',
  ]);
  let modalServiceSpy = jasmine.createSpyObj('BsModalService', [
    'show',
    'hide',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyListComponent],
      providers: [
        { provide: CurrenciesRepository, useValue: currenciesRepositorySpy },
        FormBuilder,
        { provide: Router, useValue: routerSpy },
        {
          provide: CurrencyTranslationService,
          useValue: currencyTranslationServiceSpy,
        },
        { provide: ViewportScroller, useValue: viewPortScrollerSpy },
        {
          provide: FavouritesRatesService,
          useValue: favouritesRatesServiceSpy,
        },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: BsModalService, useValue: modalServiceSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(CurrencyListComponent);
    component = fixture.componentInstance;

    currenciesRepositorySpy.getRatesWithFlags.and.returnValue(of([]));
    const exampleLocalStorageValue = 'true';
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return exampleLocalStorageValue;
    });
    authServiceSpy.isLoggedObservable.and.returnValue(of(true));
    authServiceSpy.messageAsObservable.and.returnValue(of('login'));

    fixture.detectChanges();
  });

  it('should set isSortAlphabeticallyActive on ngOnInit', () => {
    expect(localStorage.getItem).toHaveBeenCalledOnceWith('sortAlphabetically');
    expect(component.isSortAlphabeticallyActive).toBeTrue();
  });

  it('should change isCollapsed on toggle', () => {
    expect(component.isCollapsed).toBeTrue();
    component.toggleCollapse();
    expect(component.isCollapsed).toBeFalse();
    component.toggleCollapse();
    expect(component.isCollapsed).toBeTrue();
  });
});
