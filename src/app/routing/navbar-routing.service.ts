import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarRoutingService {
  private isCurrenciesActiveSubject = new BehaviorSubject<boolean>(true);

  constructor(private router: Router) {}

  onClickCurrencies(message: string): void {
    this.router.navigate(['/dashboard/currency-list'], {state: {title: message}});
  }

  onClickCalculator(): void {
    this.router.navigate(['/dashboard/currency-converter']);
  }

  onClickGold(): void {
    this.router.navigate(['/dashboard/gold-prices']);
  }
}
