import { TestBed } from '@angular/core/testing';

import { ExchangeRateService } from './exchange-rate.service';
import { HttpClient } from '@angular/common/http';

describe('ExchangeRateService', () => {
  let service: ExchangeRateService;
  let httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    service = TestBed.inject(ExchangeRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
