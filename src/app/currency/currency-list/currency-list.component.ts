import { Component, DoCheck, Inject, LOCALE_ID, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CurrenciesRepository } from '../data/currencies-repository';
import { RateWithFlag } from '../data/rate-with-flag';
import { Router } from '@angular/router';
import { IconDefinition, faArrowUpAZ, faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { CurrencyTranslationService } from '../data/currency.translation.service';
import { FavouritesRatesService } from 'src/app/favourites-rates.service';
import { ViewportScroller } from '@angular/common';
import { AuthService } from 'src/app/auth.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ModalComponent } from 'src/app/modal/modal.component';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss'],
})
export class CurrencyListComponent implements OnInit, OnDestroy {
  private SORT_KEY: string = 'sortAlphabetically'
  modalRef!: BsModalRef;

  private initialRatesWithFlag: RateWithFlag[] = []
  ratesWithFlag: RateWithFlag[] = [];
  filterForm: FormGroup;
  isSortAlphabeticallyActive: boolean = false;
  sortAlphabeticallyIcon: IconDefinition = faArrowUpAZ;
  emptyHeartIcon: IconDefinition = farHeart;
  fullHeartIcon: IconDefinition = fasHeart;
  isCollapsed: boolean = true;
  isLogged: boolean = false;
  isHeartClicked: boolean = false;
  loginMessage!: boolean;
  registerMessage!: boolean;
  message!: string;
  private isLoggedSubscription!: Subscription;

  constructor(
    private currenciesRepository: CurrenciesRepository,
    private formBuilder: FormBuilder,
    private router: Router,
    private currencyTranslationService: CurrencyTranslationService,
    private viewPortScroller: ViewportScroller,
    private favouritesRatesService: FavouritesRatesService,
    private authService: AuthService,
    private modalService: BsModalService,
    @Inject(LOCALE_ID) public locale: string 
  ) {
    // this.authService.isLoggedObservable().subscribe(
    //   res => this.isLogged = res
    // )
    this.filterForm = this.formBuilder.group({
      filterInputValue: [''],
    });
  }

  ngOnInit(): void {
    const sortType = localStorage.getItem(this.SORT_KEY)
    this.isLoggedSubscription = this.authService.isLoggedObservable().subscribe(
      (isLogged) => {
        this.isLogged = isLogged;
        this.getRatesWithFlags();
      }
    )
    this.authService.messageAsObservable().subscribe(
      (res) => {
        if (res === 'login') {
          this.message = 'Successfully logged in!';
        } else if ( res === 'register') {
          this.message = 'Successfully registered!';
        }
        if (this.message) {
          console.log('dddd')
          setTimeout(() => {
            this.authService.clearMessage();
            this.message = '';
          }, 3000);
        }
      })
    if(sortType) {
      this.isSortAlphabeticallyActive = JSON.parse(sortType)
    }
    this.filterByInputValue()
  }

  ngOnDestroy(): void {
    if (this.isLoggedSubscription) {
      this.isLoggedSubscription.unsubscribe();
    }
  }

  private filterByInputValue(): void {
    this.filterForm.get('filterInputValue')?.valueChanges.subscribe((value) => {
      this.filterAndSortRatesWithFlags()
    });
  }

  private getRatesWithFlags(): void {
    this.currenciesRepository.getRatesWithFlags().subscribe((rates) => {
      this.initialRatesWithFlag = this.currencyTranslationService.getRateWithFlagForLocale(this.locale, rates)
      if (this.isLogged) {
        this.favouritesRatesService.checkFavourites(this.initialRatesWithFlag)
      }
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

  openModalWithMessage(message: string) {
    const initialState = {
      loginInfo: message
    };
    this.modalRef = this.modalService.show(ModalComponent, { initialState })
  }

  addToFavourite(code: string, event: Event): void {
    this.isHeartClicked = !this.isHeartClicked
    event.stopPropagation()
    if (this.isLogged) {
      const foundRate = this.ratesWithFlag.find(rateWithFlag => rateWithFlag.rate.code == code)
      if(foundRate) {
        foundRate.isAddedToFavourite = true
      }
      this.favouritesRatesService.addToFavourites(code)
      this.filterAndSortRatesWithFlags()
    } else {
      this.openModalWithMessage("Login to add to favourites!")
    }
  }

  removeFromFavourite(code: string, event: Event): void {
    event.stopPropagation()
    if (this.isLogged) {
      const foundRate = this.ratesWithFlag.find(rateWithFlag => rateWithFlag.rate.code == code)
      if(foundRate) {
        foundRate.isAddedToFavourite = false
      }
      this.favouritesRatesService.removeFromFavourites(code)
      this.filterAndSortRatesWithFlags()
    }
  }

  trackByCurrency(index: Number, rateWithFlag: RateWithFlag): string {
    return rateWithFlag.rate.code
  }
}
