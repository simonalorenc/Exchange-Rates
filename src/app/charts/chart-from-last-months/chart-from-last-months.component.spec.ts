import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartFromLastMonthsComponent } from './chart-from-last-months.component';
import { ChartService } from '../chart.service';
import { ExchangeRateService } from 'src/app/currency/data/exchange-rate.service';
import { ActivatedRoute } from '@angular/router';
import { DatesService } from 'src/app/dates.service';

describe('ChartFromLastMonthsComponent', () => {
  let component: ChartFromLastMonthsComponent;
  let fixture: ComponentFixture<ChartFromLastMonthsComponent>;
  let chartServiceSpy = jasmine.createSpyObj('ChartService', ['createChart']);
  let exchangeRateServiceSpy = jasmine.createSpyObj('ExchangeRateService', ['getCurrencyExchangeTableDtoForDateRange']);
  let activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['get', 'subscribe']);
  let datesServiceSpy = jasmine.createSpyObj('DatesService', ['getFormattedDate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartFromLastMonthsComponent],
      providers: [
        { provide: ChartService, useValue: chartServiceSpy },
        { provide: ExchangeRateService, useValue: exchangeRateServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: DatesService, useValue: datesServiceSpy }
      ],
    });
    fixture = TestBed.createComponent(ChartFromLastMonthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
