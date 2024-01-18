import { Component, OnInit } from '@angular/core';
import { GoldPriceService } from './data/gold-price.service';
import { GoldPrice } from './data/gold-price';
import { DatesService } from '../dates.service';

@Component({
  selector: 'app-gold-prices',
  templateUrl: './gold-prices.component.html',
  styleUrls: ['./gold-prices.component.scss'],
})
export class GoldPricesComponent implements OnInit {
  goldPrices: GoldPrice[] = [];
  dates: string[] = [];
  currentPage: number = 1;
  private NUMBER_ITEMS_ON_PAGE: number = 14


  constructor(private goldPriceService: GoldPriceService, private datesService: DatesService) {
  }

  ngOnInit(): void {
    this.getGoldPricesFromLastDays()
  }

  getGoldPricesFromLastDays(): void {
    this.dates = this.datesService.getStartAndEndDate(13)
    this.displayGoldPrices()
  }

  displayGoldPrices(): void {
    this.goldPriceService.getGoldPricesDtoFromRangeTime(this.dates[0], this.dates[1]).subscribe(
      result => {
        const allDates = this.getAllDatesInRange();
        const pricesMap = new Map<string, number>();
        result.reverse().forEach(dto => {
          const goldPrice = new GoldPrice(dto);
          pricesMap.set(goldPrice.date, goldPrice.price);
        });
        this.goldPrices = allDates.reverse().map(date => ({
          date: date,
          price: pricesMap.get(date) !== undefined ? pricesMap.get(date)! : -1
        }));
      }
    );
  }

  onPageChangeNext(): void {
    this.currentPage = this.currentPage + 1
    this.dates = this.getDates(this.currentPage)
    this.displayGoldPrices()
  }

  onPageChangePrevious(): void {
    if(this.currentPage > 1) {
      this.currentPage = this.currentPage - 1
      this.dates = this.getDates(this.currentPage)
      this.displayGoldPrices()
    } 
    this.checkIfCurrentPageIsEqualToOne()
  }

  checkIfCurrentPageIsEqualToOne() {
    if (this.currentPage === 1){
      this.currentPage = 1
      this.dates = this.datesService.getStartAndEndDate(13)
      this.displayGoldPrices()
    }
  }

  private getDates(pageNumber: number): string[] {
    const endDate = new Date()
    endDate.setDate(endDate.getDate() - ((pageNumber - 1) * this.NUMBER_ITEMS_ON_PAGE + 1))
    const endDateString = this.datesService.getFormattedDate(endDate)

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - (pageNumber * this.NUMBER_ITEMS_ON_PAGE))
    const startDateString = this.datesService.getFormattedDate(startDate)

    return [startDateString, endDateString]
  }

  onPageChangeToFirst(): void {
    this.currentPage = 1
    this.dates = this.datesService.getStartAndEndDate(13)
    this.getGoldPricesFromLastDays()
  }
  
  getAllDatesInRange(): string[] {
    const allDates: string[] = []
    let currentDate = new Date(this.dates[0]);
    const endDateObj = new Date(this.dates[1]);
    while (currentDate <= endDateObj) {
      allDates.push(this.datesService.getFormattedDate(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
    return allDates
  }
}
