import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CurrenciesRepository } from '../data/currencies-repository';
import { RateWithFlag } from '../data/rate-with-flag';
import { Router } from '@angular/router';
import { IconDefinition, faArrowUpAZ, faSort, faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { CurrencyTranslationService } from '../data/currency.translation.service';
import { FavouritesRatesService } from 'src/app/favourites-rates.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss'],
})
export class CurrencyListComponent implements OnInit {
  SORT_KEY: string = 'sort'

  private ratesWithFlag: RateWithFlag[] = [];
  filteredRatesWithFlag: RateWithFlag[] = [];
  filterForm: FormGroup;
  isSortAlphabeticallyActive: boolean = false;
  sortAlphabeticallyIcon: IconDefinition = faArrowUpAZ;
  sortPopulrityIcon: IconDefinition = faSort;
  emptyHeartIcon: IconDefinition = farHeart;
  fullHeartIcon: IconDefinition = fasHeart;
  isCollapsed: boolean = true

  constructor(
    private currenciesRepository: CurrenciesRepository,
    private formBuilder: FormBuilder,
    private router: Router,
    private currencyTranslationService: CurrencyTranslationService,
    private viewPortScroller: ViewportScroller,
    private favouritesRatesService: FavouritesRatesService,
    @Inject(LOCALE_ID) public locale: string
  ) {
    this.filterForm = this.formBuilder.group({
      filterInputValue: [''],
    });
  }

  ngOnInit(): void {
    this.getRatesWithFlags();

    this.filterTheList()

    this.setSortingMethod()
  }

  private filterTheList() {
    this.filterForm.get('filterInputValue')?.valueChanges.subscribe((value) => {
      this.filterCurrencies(value);
    });
  }

  private setSortingMethod() {
    localStorage.setItem(this.SORT_KEY, JSON.stringify(this.isSortAlphabeticallyActive))
  }

  getRatesWithFlags(): void {
    this.currenciesRepository.getRatesWithFlags().subscribe((rates) => {
      this.ratesWithFlag = this.currencyTranslationService.getRateWithFlagForLocale(this.locale, rates)
      console.log(this.ratesWithFlag)
      this.filteredRatesWithFlag = this.ratesWithFlag;
      this.checkFavouritesAndSort();
    });
  }

  private checkFavouritesAndSort() {
    this.favouritesRatesService.checkFavourites(this.ratesWithFlag)
    this.sortFavouritesFirst()
  }

  private sortFavouritesFirst() {
    this.ratesWithFlag.sort((a, b) => {
      if(a.isAddedToFavourite && !b.isAddedToFavourite) {
        return -1
      } else if (!a.isAddedToFavourite && b.isAddedToFavourite) {
        return 1
      } else {
        return 0
      } 
    })
    this.setSortingMethod()
  }

  private filterCurrencies(filterText: string): void {
    this.filteredRatesWithFlag = this.ratesWithFlag.filter((rateWithFlag) => {
      return (
        rateWithFlag.rate.code.toLowerCase().includes(filterText) ||
        rateWithFlag.rate.currency
          .toLowerCase()
          .includes(filterText.toLowerCase())
      );
    });
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed
  }

  sortAlphabetically(): void {
    this.isSortAlphabeticallyActive = true;
    this.filteredRatesWithFlag = this.ratesWithFlag.concat().sort((a, b) => {
      return a.rate.currency.localeCompare(b.rate.currency);
    });
    this.setSortingMethod()
    this.toggleCollapse()
  }

  sortByFavourites(): void {
    this.isSortAlphabeticallyActive = false;
    this.filteredRatesWithFlag = this.ratesWithFlag;
    this.setSortingMethod()
    this.toggleCollapse()
  }

  navigateToDetail(code: string): void {
    this.router.navigate([`/detail/${code}`]);
    this.viewPortScroller.scrollToPosition([0, 0])
  }

  addToFavourite(code: string, event: Event): void {
    event.stopPropagation()
    const foundRate = this.filteredRatesWithFlag.find(rateWithFlag => rateWithFlag.rate.code == code)
    if(foundRate) {
      foundRate.isAddedToFavourite = true
    }
    this.favouritesRatesService.addToFavourites(code)
    this.sortFavouritesFirst()
  }

  removeFromFavourite(code: string, event: Event): void {
    event.stopPropagation()
    const foundRate = this.filteredRatesWithFlag.find(rateWithFlag => rateWithFlag.rate.code == code)
    if(foundRate) {
      foundRate.isAddedToFavourite = false
    }
    this.favouritesRatesService.removeFromFavourites(code)
    this.getRatesWithFlags()
  }

  // private getStoredRates(): string[] {
  //   let storedRates: string[] | null = JSON.parse(localStorage.getItem(this.FAVOURITES_KEY) || 'null');
  //     if (storedRates === null) {
  //       storedRates = [];
  //     }
  //   return storedRates
  // }

  // addToFavourites(code: string): void {
  //   const storedRates = this.getStoredRates()
  //   storedRates.push(code);
  //   localStorage.setItem(this.FAVOURITES_KEY, JSON.stringify(storedRates))
  // }
}
