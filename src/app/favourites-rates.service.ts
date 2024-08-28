import { Injectable } from '@angular/core';
import { RateWithFlag } from './currency/data/rate-with-flag';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class FavouritesRatesService {
  userFavouritesRates!: string[];  

  constructor(private authService: AuthService, private userService: UserService) {
  }

  initializeFavouritesAfterRegister(): void {
    this.userFavouritesRates = [];
  }

  addToFavourites(code: string): void {
    console.log('Current context:', this);
    let jwtToken = this.authService.getToken();
    if (jwtToken) {
      this.userService.addCurrency(code, jwtToken).subscribe(
        () => {
          if (!this.userFavouritesRates) {
            this.userFavouritesRates = [];
          }
          this.userFavouritesRates.push(code);
        }
      )
    }
  }

  removeFromFavourites(code: string): void {
    let jwtToken = this.authService.getToken();
    if (jwtToken) {
      this.userService.deleteCurrency(code, jwtToken).subscribe(
        () => {
          this.userFavouritesRates = this.userFavouritesRates.filter((el) => el !== code);
        }
      )
    }
  }

  checkFavourites(ratesWithFlag: RateWithFlag[]) {
    let jwtToken = this.authService.getToken();
    if (jwtToken) {
      this.userService.getUserCurrencies(jwtToken).subscribe(
        res => {
          this.userFavouritesRates = res;
          if (this.userFavouritesRates) {
            ratesWithFlag.forEach(rateWithFlag => {
              rateWithFlag.isAddedToFavourite = this.userFavouritesRates.includes(rateWithFlag.rate.code)
            })
          }
        }
      )
    }
  }

  checkIfRateIsInFavourites(code: string): boolean {
    return this.userFavouritesRates.includes(code)
  }
}