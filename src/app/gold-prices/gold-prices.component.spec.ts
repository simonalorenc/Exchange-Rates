import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldPricesComponent } from './gold-prices.component';
import { DatesService } from '../dates.service';
import { GoldPriceService } from './data/gold-price.service';
import { of } from 'rxjs';

describe('GoldPricesComponent', () => {
  let component: GoldPricesComponent;
  let fixture: ComponentFixture<GoldPricesComponent>;
  let goldPricesServiceSpy = jasmine.createSpyObj('GoldPricesService', ['getGoldPricesDtoFromRangeTime']);
  let datesServiceSpy = jasmine.createSpyObj('DatesService', ['getStartAndEndDate', 'getFormattedDate']);

  beforeEach(() => {
    datesServiceSpy.getStartAndEndDate.and.returnValue(['', ''])
    goldPricesServiceSpy.getGoldPricesDtoFromRangeTime.and.returnValue(of([]))
    TestBed.configureTestingModule({
      declarations: [GoldPricesComponent],
      providers: [
        { provide: GoldPriceService, useValue: goldPricesServiceSpy },
        { provide: DatesService, useValue: datesServiceSpy }
      ],
    });
    fixture = TestBed.createComponent(GoldPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
