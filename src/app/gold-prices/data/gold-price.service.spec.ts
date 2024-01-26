import { TestBed } from '@angular/core/testing';

import { GoldPriceService } from './gold-price.service';
import { HttpClient } from '@angular/common/http';

describe('GoldPricesService', () => {
  let service: GoldPriceService;
  let httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);  

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy}
      ]
    });
    service = TestBed.inject(GoldPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
