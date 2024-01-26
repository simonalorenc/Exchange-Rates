import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyConverterComponent } from './currency-converter.component.component';
import { CurrenciesRepository } from '../data/currencies-repository';
import { of } from 'rxjs';

describe('CurrencyConverterComponent', () => {
  let component: CurrencyConverterComponent;
  let fixture: ComponentFixture<CurrencyConverterComponent>;
  let currenciesRepositorySpy = jasmine.createSpyObj('CurrenciesRepository', [
    'getRatesWithFlags',
  ]);

  beforeEach(() => {
    currenciesRepositorySpy.getRatesWithFlags.and.returnValue(of([]));

    TestBed.configureTestingModule({
      declarations: [CurrencyConverterComponent],
      providers: [
        { provide: CurrenciesRepository, useValue: currenciesRepositorySpy },
      ],
    });
    fixture = TestBed.createComponent(CurrencyConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
