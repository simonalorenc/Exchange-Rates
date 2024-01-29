import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyConverterComponent, CurrencyInputData } from './currency-converter.component.component';
import { CurrenciesRepository } from '../data/currencies-repository';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CurrencyConverterComponent', () => {
  let component: CurrencyConverterComponent;
  let fixture: ComponentFixture<CurrencyConverterComponent>;
  let currenciesRepositorySpy = jasmine.createSpyObj('CurrenciesRepository', [
    'getRatesWithFlags',
  ]);
    const fromCurrencyInputData = 1;
  const toCurrencyInputData = 1.2;
  const INIT_FROM_VALUE: number = 1;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [CurrencyConverterComponent],
      providers: [
        { provide: CurrenciesRepository, useValue: currenciesRepositorySpy },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(CurrencyConverterComponent);
    component = fixture.componentInstance;

    const ratesWithFlag = [
      { rate: { code: 'EUR', mid: fromCurrencyInputData }, flag: '' },
      { rate: { code: 'USD', mid: toCurrencyInputData }, flag: '' },
    ]
    currenciesRepositorySpy.getRatesWithFlags.and.returnValue(of(ratesWithFlag))

    fixture.detectChanges();
  });

  it('should update from currency input value', () => {
    const inputValue = 10
    
    component.updateFromRate(inputValue)

    expect(component.fromCurrencyInputData.rateValue).toBe(inputValue);
    expect(component.toCurrencyInputData.inputValue).toBeCloseTo((INIT_FROM_VALUE * inputValue / toCurrencyInputData), 4)
  });

  it('should update to currency input value',() => {
    const inputValue: number = 16
    const value: number = component.fromValueChanged(INIT_FROM_VALUE)
    component.updateToRate(inputValue)

    expect(component.toCurrencyInputData.rateValue).toEqual(16)
    expect(component.fromCurrencyInputData.inputValue).toBeCloseTo((value * inputValue / fromCurrencyInputData),4)
  })
});
