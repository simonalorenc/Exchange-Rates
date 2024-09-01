import { Injectable, OnDestroy } from '@angular/core';
import { RateWithFlag } from './currency/data/rate-with-flag';
import { UserService } from './user.service';
import { map, Observable, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavouritesRatesService implements OnDestroy {
  userFavouritesRates!: string[];
  private destroy$ = new Subject<void>();

  constructor(private userService: UserService) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initializeFavouritesAfterRegister(): void {
    this.userFavouritesRates = [];
  }

  addToFavourites(code: string): void {
    this.userService
      .addCurrency(code)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (!this.userFavouritesRates) {
          this.userFavouritesRates = [];
        }
        this.userFavouritesRates.push(code);
      });
  }

  removeFromFavourites(code: string): void {
    this.userService
      .deleteCurrency(code)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.userFavouritesRates = this.userFavouritesRates.filter(
          (el) => el !== code
        );
      });
  }

  checkFavourites(ratesWithFlag: RateWithFlag[]) {
    this.userService
      .getUserCurrencies()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
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

  checkIfRateIsInFavourites(code: string): Observable<boolean> {
    return this.userService.getUserCurrencies().pipe(
      map((res) => {
        this.userFavouritesRates = res;
        return this.userFavouritesRates.includes(code);
      })
    );
  }
}
