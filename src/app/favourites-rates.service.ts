import { Injectable } from '@angular/core';
import { RateWithFlag } from './currency/data/rate-with-flag';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Observable, catchError, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavouritesRatesService {
  userFavouritesRates: string[] = [];  

  constructor(private authService: AuthService, private userService: UserService) {
    
  }

  private getStoredRatesObservable(): Observable<string[]> {
    let jwtToken = this.authService.getToken();
    if (!jwtToken) {
      return of([]);
    }
    return this.userService.getUserCurrencies(jwtToken).pipe(
      switchMap(res => {
        if (res !== null) {
          this.userFavouritesRates = res;
        }
        return of(this.userFavouritesRates);
      }),
      catchError(() => {
        return of([]);
      })
    )
  }

  public getStoredRates(): void {
    this.getStoredRatesObservable().subscribe(
      res => {
        this.userFavouritesRates = res;
      }
    )
  }

  addToFavourites(code: string): void {
    this.getStoredRates();
    let jwtToken = this.authService.getToken();
    if (jwtToken) {
      this.userService.addCurrency(code, jwtToken).subscribe(
        () => {
          this.userFavouritesRates.push(code);
        }
      )
    }
  }

  removeFromFavourites(code: string): void {
    let jwtToken = this.authService.getToken();
    if (jwtToken) {
      this.userService.deleteCurrency(code, jwtToken).subscribe(
        res => {
          this.userFavouritesRates = this.userFavouritesRates.filter((el) => el !== code);
        }
      )
    }
  }

  checkFavourites(ratesWithFlag: RateWithFlag[]) {
    this.getStoredRatesObservable().subscribe(
      res => {
        this.userFavouritesRates = res;
        if (this.userFavouritesRates) {
          ratesWithFlag.forEach(rateWithFlag => {
          rateWithFlag.isAddedToFavourite = this.userFavouritesRates.includes(rateWithFlag.rate.code);
          })
        }
      }
    );
  }

  checkIfRateIsInFavourites(code: string): boolean {
    this.getStoredRates()
    return this.userFavouritesRates.includes(code)
  }
}