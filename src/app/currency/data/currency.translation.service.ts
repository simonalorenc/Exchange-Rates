import { Injectable } from '@angular/core';
import * as englishCurrencyNameJson from '../../../locale/currency-name-map.en.json';
import { RateWithFlag } from './rate-with-flag';
import { CurrencyExchangeTableDto } from './currency-exchange-table-dto';

@Injectable({
  providedIn: 'root'
})
export class CurrencyTranslationService {

  private englishCurrencyNameJson: any = englishCurrencyNameJson

  //TODO: inject locale and don't pass in function
  getRateWithFlagForLocale(locale: string, ratesWithFlag: RateWithFlag[]): RateWithFlag[] {
    const result = [...ratesWithFlag]
    if(locale === 'en-US') {
      result.forEach((rateWithFlag) => {
        rateWithFlag.rate.currency = this.englishCurrencyNameJson[rateWithFlag.rate.code];
      });
    }
    return result
  }

  //TODO: refactor to not update input parameter
  updateDetailCurrency(locale: string, rate: CurrencyExchangeTableDto): string {
    if(locale === 'en-US') {
      rate.currency = this.englishCurrencyNameJson[rate.code]
    }
    return rate.currency
  }
}

