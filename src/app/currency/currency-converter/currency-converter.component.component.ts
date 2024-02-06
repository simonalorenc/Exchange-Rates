import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CurrenciesRepository } from '../data/currencies-repository';
import { RateWithFlag } from '../data/rate-with-flag';
import { IconDefinition, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
  fromCurrencyInputData!: CurrencyInputData 
  toCurrencyInputData!: CurrencyInputData

  ratesWithFlag: RateWithFlag[] = []
  initFromRateWithFlag!: RateWithFlag
  initToRateWithFlag!: RateWithFlag

  private FROM_RATE_CODE: string = 'EUR'
  private TO_RATE_CODE: string = 'USD'
  private INIT_FROM_VALUE: number = 1

  arrowIcon: IconDefinition = faArrowRight

  constructor(
    private currenciesRepository: CurrenciesRepository
  ) {
  }

  ngOnInit(): void {
    this.getRatesWithFlags()
  }

  private getRatesWithFlags(): void {
    this.currenciesRepository.getRatesWithFlags().subscribe((rates) => {
      this.ratesWithFlag = rates
      this.initFromRateWithFlag = rates.find((rate) => {
        return rate.rate.code === this.FROM_RATE_CODE
      })!
      this.initToRateWithFlag = rates.find((rate) => {
        return rate.rate.code === this.TO_RATE_CODE
      })!
      this.fromCurrencyInputData = new CurrencyInputData(this.INIT_FROM_VALUE, this.initFromRateWithFlag.rate.mid)
      this.toCurrencyInputData = new CurrencyInputData(0, this.initToRateWithFlag.rate.mid)

      this.fromValueChanged(this.INIT_FROM_VALUE)
    });
  }

  updateFromRate(value: number) {
    this.fromCurrencyInputData.rateValue = value
    this.fromValueChanged(this.fromCurrencyInputData.inputValue)
  }

  updateToRate(value: number) {
    this.toCurrencyInputData.rateValue = value
    this.toValueChanged(this.toCurrencyInputData.inputValue)
  }

  fromValueChanged(value: number): number {
    return this.toCurrencyInputData.inputValue = +(value * this.fromCurrencyInputData.rateValue / this.toCurrencyInputData.rateValue).toFixed(4)
  }

  toValueChanged(value: number): number {
     return this.fromCurrencyInputData.inputValue = +(value * this.toCurrencyInputData.rateValue / this.fromCurrencyInputData.rateValue).toFixed(4)
  }
}

export class CurrencyInputData {
  inputValue: number
  rateValue: number

  constructor(inputValue: number, rateValue: number) {
    this.inputValue = inputValue
    this.rateValue = rateValue
  }
}