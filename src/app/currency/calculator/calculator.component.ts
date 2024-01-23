import { Component, OnInit } from '@angular/core';
import { CurrenciesRepository } from '../data/currencies-repository';
import { RateWithFlag } from '../data/rate-with-flag';
import { ExchangeRateService } from '../data/exchange-rate.service';
import { FlagsService } from '../data/flags.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  ratesWithFlag: RateWithFlag[] = []

  exampleExchangeRate: boolean = true
  exampleExchangeRateToConvert: boolean = true

  exchangeRateCode: string = ''
  exchangeRateAmount: number = 1

  exchangeRateToConvertCode: string = ''
  exchangeRateToConvert: number = 0

  isClicked: boolean = false
  isClickedToConvert: boolean = false

  flagUrl!: string
  flagUrlToConvert!: string

  inputValue1: number = 0
  inputValue2: number = 0

  constructor(
    private currenciesRepository: CurrenciesRepository,
    private exchangeRatesService: ExchangeRateService,
    private flagsService: FlagsService
  ) {}

  ngOnInit(): void {
    this.getRatesWithFlags()
  }

  private getRatesWithFlags(): void {
    this.currenciesRepository.getRatesWithFlags().subscribe((rates) => {
      this.ratesWithFlag = rates
      console.log(rates)
    });
  }

  selectCurrency(): void {
    this.isClicked = !this.isClicked
  }

  selectCurrencyToConvert(): void {
    this.exampleExchangeRateToConvert = false
    this.isClickedToConvert = !this.isClickedToConvert
  }

  clickedCurrency(code: string) {
    this.exchangeRateCode = code
    this.exchangeRatesService.getExchangeRateForCode(code).subscribe(rate => this.exchangeRateAmount = rate)
    this.exampleExchangeRate = false
    const countryCode = this.currenciesRepository.getCountryCode(code)
    this.flagUrl = this.flagsService.getFlagUrl(countryCode)
  }

  clickedCurrencyToConvert(code: string) {
    this.exchangeRateToConvertCode = code
    this.exchangeRatesService.getExchangeRateForCode(code).subscribe(rate => this.exchangeRateToConvert = rate)
    this.exampleExchangeRateToConvert = false
    const countryCode = this.currenciesRepository.getCountryCode(code)
    this.flagUrlToConvert = this.flagsService.getFlagUrl(countryCode)
  }

  updateConvertedValue() {
    this.inputValue2 = (this.inputValue1 * this.exchangeRateAmount) / this.exchangeRateToConvert
  }

  updateOriginalValue() {
    this.inputValue1 = (this.inputValue2 * this.exchangeRateToConvert) / this.exchangeRateAmount
  }

}
