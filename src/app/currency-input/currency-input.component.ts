import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RateWithFlag } from '../currency/data/rate-with-flag';
import { CurrenciesRepository } from '../currency/data/currencies-repository';
import { ExchangeRateService } from '../currency/data/exchange-rate.service';
import { FlagsService } from '../currency/data/flags.service';

@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss']
})
export class CurrencyInputComponent implements OnInit {
  isClicked: boolean = false
  exampleExchangeRate: boolean = true
  exchangeRateCode: string = ''
  exchangeRateAmount!: number
  flagUrl: string = ''

  @Input() exampleRateWithFlag!: RateWithFlag
  @Input() ratesWithFlag: RateWithFlag[] = []
  @Input() inputValue: number = 1

  @Output() valueChanged = new EventEmitter<number>()
  @Output() exchangeRateChange = new EventEmitter<number>()

  constructor(
    private currenciesRepository: CurrenciesRepository,
    private exchangeRatesService: ExchangeRateService,
    private flagsService: FlagsService
  ) {}

  ngOnInit(): void {
  }

  selectCurrency(): void {
    this.isClicked = !this.isClicked
  }

  clickedCurrency(code: string) {
    this.exchangeRateCode = code
    this.exchangeRatesService.getExchangeRateForCode(code).subscribe(rate => this.exchangeRateAmount = rate)
    this.exampleExchangeRate = false
    const countryCode = this.currenciesRepository.getCountryCode(code)
    this.flagUrl = this.flagsService.getFlagUrl(countryCode)
    this.selectCurrency()
    this.updateExchangeRate()
  }

  updateExchangeRate() {
    this.exchangeRateChange.emit(this.exchangeRateAmount)
  }

  onValueChanged() {
    console.log(this.inputValue)
    this.valueChanged.emit(this.inputValue)
  }
}
