import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartFromLastDaysComponent } from './chart-from-last-days.component';
import { ChartService } from '../chart.service';
import { ExchangeRateService } from 'src/app/currency/data/exchange-rate.service';
import { ActivatedRoute } from '@angular/router';

describe('ChartFromLast30DaysComponent', () => {
  let component: ChartFromLastDaysComponent;
  let fixture: ComponentFixture<ChartFromLastDaysComponent>;
  let chartServiceSpy = jasmine.createSpyObj('ChartService', ['createChart']);
  let exchangeRateServiceSpy = jasmine.createSpyObj('ExchangeRateService', ['getCurrencyExchangeTableDtoFromLastDays']);
  let activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['get', 'subscribe']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartFromLastDaysComponent],
      providers: [
        { provide: ChartService, useValue: chartServiceSpy },
        { provide: ExchangeRateService, useValue: exchangeRateServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ],
    });
    fixture = TestBed.createComponent(ChartFromLastDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
