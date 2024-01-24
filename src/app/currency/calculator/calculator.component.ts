import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CurrenciesRepository } from '../data/currencies-repository';
import { RateWithFlag } from '../data/rate-with-flag';
import { IconDefinition, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  ratesWithFlag: RateWithFlag[] = []
  exampleRatesWithFlag: RateWithFlag[] = []

  fromCurrencyInputData: CurrencyInputData | undefined
  toCurrencyInputData: CurrencyInputData | undefined

  fromValue: number = 1
  toValue: number = 0

  exampleRateWithFlag!: RateWithFlag
  secondExampleRateWithFlag!: RateWithFlag

  exchangeRateAmount!: number
  exchangeRateToConvert: number = 0

  inputValue1: number = 1
  inputValue2: number = 0

  arrowIcon: IconDefinition = faArrowRight

  @Output() updateConvertedValueInput = new EventEmitter<number>()
  @Output() updateOriginalValueInput = new EventEmitter<number>()

  constructor(
    private currenciesRepository: CurrenciesRepository
  ) {}

  ngOnInit(): void {
    this.getRatesWithFlags()
  }

  private getRatesWithFlags(): void {
    this.currenciesRepository.getRatesWithFlags().subscribe((rates) => {
      this.ratesWithFlag = rates
      this.exampleRatesWithFlag.push(rates[0], rates[1])
      this.exampleRateWithFlag = this.exampleRatesWithFlag[0]
      this.secondExampleRateWithFlag = this.exampleRatesWithFlag[1]
      this.exchangeRateToConvert = this.exampleRatesWithFlag[0].rate.mid
      this.exchangeRateAmount = this.exampleRatesWithFlag[1].rate.mid
      this.fromValueChanged(this.inputValue1)
    });
  }

  updateExchangeRate1(value: number) {
    this.exchangeRateAmount = value
    this.fromValueChanged(this.fromValue)
  }

  updateExchangeRate2(value: number) {
    this.exchangeRateToConvert = value
    this.toValueChanged(this.toValue)
  }

  fromValueChanged(value: number) {
    this.toValue = +(value * this.exchangeRateAmount / this.exchangeRateToConvert).toFixed(2)
  }

  toValueChanged(value: number) {
    this.fromValue = +(value * this.exchangeRateToConvert / this.exchangeRateAmount).toFixed(2)
  }
}

export class CurrencyInputData {
  value: number
  rateWithFlag: RateWithFlag

  constructor(value: number, rateWithFlag: RateWithFlag) {
    this.value = value
    this.rateWithFlag = rateWithFlag
  }
}