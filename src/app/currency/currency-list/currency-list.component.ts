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
  private SORT_KEY: string = 'sortAlphabetically'

  private initialRatesWithFlag: RateWithFlag[] = []
  ratesWithFlag: RateWithFlag[] = [];
  filterForm: FormGroup;
  isSortAlphabeticallyActive: boolean = false;
  sortAlphabeticallyIcon: IconDefinition = faArrowUpAZ;
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
    @Inject(LOCALE_ID) public locale: string //TODO public?
  ) {
    this.filterForm = this.formBuilder.group({
      filterInputValue: [''],
    });
  }

  ngOnInit(): void {
    const sortType = localStorage.getItem(this.SORT_KEY)
    if(sortType) {
      this.isSortAlphabeticallyActive = JSON.parse(sortType)
    }
    this.filterByInputValue()
    this.getRatesWithFlags();
  }

  private filterByInputValue() {
    this.filterForm.get('filterInputValue')?.valueChanges.subscribe((value) => {
      this.filterAndSortRatesWithFlags()
    });
  }

  private getRatesWithFlags(): void {
    this.currenciesRepository.getRatesWithFlags().subscribe((rates) => {
      this.initialRatesWithFlag = this.currencyTranslationService.getRateWithFlagForLocale(this.locale, rates)
      this.favouritesRatesService.checkFavourites(this.initialRatesWithFlag)
      this.ratesWithFlag = [...this.initialRatesWithFlag]
      this.sortCurrencies()
    });
  }

  private filterAndSortRatesWithFlags() {
    let currentFilter = this.filterForm.get('filterInputValue')?.value
    this.ratesWithFlag = this.filterCurrencies(currentFilter)
    this.sortCurrencies()
  }

  private filterCurrencies(filterText: string): RateWithFlag[] {
    return this.initialRatesWithFlag.filter((rateWithFlag) => {
      return (
        rateWithFlag.rate.code.toLowerCase().includes(filterText) ||
        rateWithFlag.rate.currency
          .toLowerCase()
          .includes(filterText.toLowerCase())
      );
    });
  }

  private sortCurrencies(): void {
    if(this.isSortAlphabeticallyActive) {
      this.ratesWithFlag.sort((a, b) => {
        return a.rate.currency.localeCompare(b.rate.currency);
      });
    } else {
      this.ratesWithFlag.sort((a, b) => {
        if(a.isAddedToFavourite && !b.isAddedToFavourite) {
          return -1
        } else if (!a.isAddedToFavourite && b.isAddedToFavourite) {
          return 1
        } else {
          return 0
        } 
      })
    }
  }

  setSortType(isSortAlphabetically: boolean): void {
    this.isSortAlphabeticallyActive = isSortAlphabetically;
    this.setSortingMethod()
    this.toggleCollapse()
    this.filterAndSortRatesWithFlags()
  }

  private setSortingMethod() {
    localStorage.setItem(this.SORT_KEY, JSON.stringify(this.isSortAlphabeticallyActive))
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed
  }

  navigateToDetail(code: string): void {
    this.router.navigate([`/detail/${code}`]);
    this.viewPortScroller.scrollToPosition([0, 0])
  }

  addToFavourite(code: string, event: Event): void {
    event.stopPropagation()
    const foundRate = this.ratesWithFlag.find(rateWithFlag => rateWithFlag.rate.code == code)
    if(foundRate) {
      foundRate.isAddedToFavourite = true
    }
    this.favouritesRatesService.addToFavourites(code)
    this.filterAndSortRatesWithFlags()
  }

  removeFromFavourite(code: string, event: Event): void {
    event.stopPropagation()
    const foundRate = this.ratesWithFlag.find(rateWithFlag => rateWithFlag.rate.code == code)
    if(foundRate) {
      foundRate.isAddedToFavourite = false
    }
    this.favouritesRatesService.removeFromFavourites(code)
    this.filterAndSortRatesWithFlags()
  }
}
