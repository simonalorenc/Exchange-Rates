import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { RateWithFlag } from '../currency/data/rate-with-flag';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss']
})
export class CurrencyInputComponent implements OnInit {
  isListExpanded: boolean = false

  @Input() rateWithFlag: RateWithFlag | undefined
  @Input() ratesWithFlag: RateWithFlag[] = []
  @Input() inputValue: number = 1

  @Output() valueChanged = new EventEmitter<number>()
  @Output() exchangeRateChange = new EventEmitter<number>()

  arrowIcon: IconDefinition = faChevronDown

  constructor() {}

  ngOnInit(): void {
  }

  toggleList(): void {
    this.isListExpanded = !this.isListExpanded
  }

  clickedCurrency(rateWithFlag: RateWithFlag) {
    this.rateWithFlag = rateWithFlag
    this.toggleList()
    this.updateExchangeRate()
  }

  updateExchangeRate() {
    this.exchangeRateChange.emit(this.rateWithFlag?.rate.mid)
  }

  onValueChanged() {
    this.valueChanged.emit(this.inputValue)
  }
}
