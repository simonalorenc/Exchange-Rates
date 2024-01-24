import { Component, OnInit } from '@angular/core';
import { CurrenciesRepository } from '../data/currencies-repository';
import { RateWithFlag } from '../data/rate-with-flag';
import { ExchangeRateService } from '../data/exchange-rate.service';
import { FlagsService } from '../data/flags.service';
import { IconDefinition, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  ratesWithFlag: RateWithFlag[] = []
  exampleRatesWithFlag: RateWithFlag[] = []

  exampleExchangeRate: boolean = true
  exampleExchangeRateToConvert: boolean = true

  exchangeRateCode: string = ''
  exchangeRateAmount!: number

  exchangeRateToConvertCode: string = ''
  exchangeRateToConvert: number = 0

  isClicked: boolean = false
  isClickedToConvert: boolean = false

  flagUrl: string = ''
  flagUrlToConvert: string = ''

  inputValue1: number = 1
  inputValue2: number = 0

  arrowIcon: IconDefinition = faArrowRight

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
      this.exampleRatesWithFlag.push(rates[0], rates[1])
      this.exchangeRateToConvert = this.exampleRatesWithFlag[0].rate.mid
      this.exchangeRateAmount = this.exampleRatesWithFlag[1].rate.mid
      this.updateConvertedValue()
    });
  }

  selectCurrency(): void {
    this.isClicked = !this.isClicked
  }

  selectCurrencyToConvert(): void {
    this.isClickedToConvert = !this.isClickedToConvert
  }

  clickedCurrency(code: string) {
    this.exchangeRateCode = code
    this.exchangeRatesService.getExchangeRateForCode(code).subscribe(rate => this.exchangeRateAmount = rate)
    this.exampleExchangeRate = false
    const countryCode = this.currenciesRepository.getCountryCode(code)
    this.flagUrl = this.flagsService.getFlagUrl(countryCode)
    this.selectCurrency()
  }

  clickedCurrencyToConvert(code: string) {
    this.exchangeRateToConvertCode = code
    this.exchangeRatesService.getExchangeRateForCode(code).subscribe(rate => this.exchangeRateToConvert = rate)
    this.exampleExchangeRateToConvert = false
    const countryCode = this.currenciesRepository.getCountryCode(code)
    this.flagUrlToConvert = this.flagsService.getFlagUrl(countryCode)
    this.selectCurrencyToConvert()
  }

  updateConvertedValue() {
    console.log(this.inputValue2)
    this.inputValue2 = +((this.inputValue1 * this.exchangeRateAmount) / this.exchangeRateToConvert).toFixed(2)
  }

  updateOriginalValue() {
    this.inputValue1 = +((this.inputValue2 * this.exchangeRateToConvert) / this.exchangeRateAmount).toFixed(2)
  }

}
