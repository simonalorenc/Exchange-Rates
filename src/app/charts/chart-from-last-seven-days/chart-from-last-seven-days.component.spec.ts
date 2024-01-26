import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartFromLastSevenDaysComponent } from './chart-from-last-seven-days.component';
import { ChartService } from '../chart.service';
import { ExchangeRateService } from 'src/app/currency/data/exchange-rate.service';
import { ActivatedRoute } from '@angular/router';

describe('ChartFromLastSevenDaysComponent', () => {
  let component: ChartFromLastSevenDaysComponent;
  let fixture: ComponentFixture<ChartFromLastSevenDaysComponent>;
  let chartServiceSpy = jasmine.createSpyObj('ChartService', ['createChart']);
  let exchangeRateServiceSpy = jasmine.createSpyObj('ExchangeRateService', ['getCurrencyExchangeTableDtoFromLastDays']);
  let activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['get', 'subscribe']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartFromLastSevenDaysComponent],
      providers: [
        { provide: ChartService, useValue: chartServiceSpy },
        { provide: ExchangeRateService, useValue: exchangeRateServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ],
    });
    fixture = TestBed.createComponent(ChartFromLastSevenDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
