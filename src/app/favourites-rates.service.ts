import { Injectable } from '@angular/core';
import { RateWithFlag } from './currency/data/rate-with-flag';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class FavouritesRatesService {
  userFavouritesRates!: string[];

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  initializeFavouritesAfterRegister(): void {
    this.userFavouritesRates = [];
  }

  addToFavourites(code: string): void {
    this.userService.addCurrency(code).subscribe(() => {
      if (!this.userFavouritesRates) {
        this.userFavouritesRates = [];
      }
      this.userFavouritesRates.push(code);
    });
  }

  removeFromFavourites(code: string): void {
    this.userService.deleteCurrency(code).subscribe(() => {
      this.userFavouritesRates = this.userFavouritesRates.filter(
        (el) => el !== code
      );
    });
  }

  checkFavourites(ratesWithFlag: RateWithFlag[]) {
    this.userService.getUserCurrencies().subscribe((res) => {
      this.userFavouritesRates = res;
      if (this.userFavouritesRates) {
        ratesWithFlag.forEach((rateWithFlag) => {
          rateWithFlag.isAddedToFavourite = this.userFavouritesRates.includes(
            rateWithFlag.rate.code
          );
        });
      }
    });
  }

  checkIfRateIsInFavourites(code: string): boolean {
    return this.userFavouritesRates.includes(code);
  }
}
