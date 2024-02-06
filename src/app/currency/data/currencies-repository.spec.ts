import { TestBed } from "@angular/core/testing";
import { CurrenciesRepository } from "./currencies-repository";
import { ExchangeRateService } from "./exchange-rate.service";
import { FlagsService } from "./flags.service";

describe('CurrenciesRepository', () => {
  let repository: CurrenciesRepository;
  let exchangeRateServiceSpy = jasmine.createSpyObj('ExchangeRateService', ['getAllRateDtos']);
  let flagsServiceSpy = jasmine.createSpyObj('FlagsService', ['getFlagUrl']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ExchangeRateService, useValue: exchangeRateServiceSpy },
        { provide: FlagsService, useValue: flagsServiceSpy },
      ],
    });
    repository = TestBed.inject(CurrenciesRepository);
  });
  
  it('should return country code', () => {
    const currencyCode = 'eur'
    const countryCode = repository.getCountryCode(currencyCode)
    expect(countryCode).toEqual('eu');
  });
});