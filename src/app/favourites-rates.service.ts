import { Injectable } from '@angular/core';
import { RateWithFlag } from './currency/data/rate-with-flag';

@Injectable({
  providedIn: 'root',
})
export class FavouritesRatesService {
  private FAVOURITES_KEY: string = 'codes'

  private getStoredRates(): string[] {
    let storedRates: string[] | null = JSON.parse(localStorage.getItem(this.FAVOURITES_KEY) || 'null');
      if (storedRates === null) {
        storedRates = [];
      }
    return storedRates
  }

  addToFavourites(code: string): void {
    const storedRates = this.getStoredRates()
    storedRates.push(code);
    localStorage.setItem(this.FAVOURITES_KEY, JSON.stringify(storedRates))
  }

  removeFromFavourites(code: string): void {
    let storedRates = this.getStoredRates()
    storedRates = storedRates.filter((el) => el !== code);
    localStorage.setItem(this.FAVOURITES_KEY, JSON.stringify(storedRates));
  }

  checkFavourites(ratesWithFlag: RateWithFlag[]) {
    const favouriteRatesJson = localStorage[this.FAVOURITES_KEY];
    if (favouriteRatesJson) {
      const favouriteRates: string[] = JSON.parse(favouriteRatesJson)
      ratesWithFlag.forEach(rateWithFlag => {
        rateWithFlag.isAddedToFavourite = favouriteRates.includes(rateWithFlag.rate.code)
      })
    }
  }

  checkIfRateIsInFavourites(code: string): boolean {
    const favouriteRates = this.getStoredRates()
    return favouriteRates.includes(code)
  }
}