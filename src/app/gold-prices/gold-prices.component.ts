import { Component, OnInit } from '@angular/core';
import { GoldPrice } from '../gold-prices';
import { GoldPricesService } from './gold-prices.service';

@Component({
  selector: 'app-gold-prices',
  templateUrl: './gold-prices.component.html',
  styleUrls: ['./gold-prices.component.scss']
})
export class GoldPricesComponent implements OnInit{
  goldPricesArray: GoldPrice[] = []

  constructor(private goldPricesService: GoldPricesService) {}

  ngOnInit(): void {
    this.goldPricesService.getGoldPricesObservable().subscribe(
      result => {
        this.goldPricesArray = result.reverse()
        console.log(result)
        console.log(this.goldPricesArray)
      },
      (error) => console.error('GetGoldPrices ' + error)
    )
  }
}
