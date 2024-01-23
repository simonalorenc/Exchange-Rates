import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  combineLatest,
  map, 
  of, 
  switchMap
} from 'rxjs';
import { ExchangeTableDto, RateDto } from './exchange-table-dto';
import { CurrencyExchangeTableDto } from './currency-exchange-table-dto';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  private BASE_URL: string = 'https://api.nbp.pl/api/exchangerates';

  private codeToTableMap: Map<string, string> = new Map<string, string>()
  private codeToMapWithExchangeRates: Map<string, number> = new Map<string, number>

  constructor(private http: HttpClient) {
  }

  private getExchangeTableDtos(tableName: string): Observable<ExchangeTableDto[]> {
    const exchangeTableUrl: string = `${this.BASE_URL}/tables/${tableName}`;
    return this.http.get<ExchangeTableDto[]>(exchangeTableUrl);
  }

  getAllRateDtos(): Observable<RateDto[]> {
    const tableA: Observable<ExchangeTableDto[]> = this.getExchangeTableDtos('A');
    const tableB: Observable<ExchangeTableDto[]> = this.getExchangeTableDtos('B');
    return combineLatest([tableA, tableB]).pipe(
      map(([resultA, resultB]) => {
        const ratesA = resultA[0].rates;
        this.addCodesToTableMap(resultA[0])
        this.addExchangeRatesToMap(resultA[0])
        const ratesB = resultB[0].rates;
        this.addCodesToTableMap(resultB[0])
        this.addExchangeRatesToMap(resultB[0])
        return [...ratesA, ...ratesB];
      })
    );
  }

  private addCodesToTableMap(exchangeTable: ExchangeTableDto): void {
    exchangeTable.rates.forEach(rate => this.codeToTableMap.set(rate.code, exchangeTable.table))
  }

  private addExchangeRatesToMap(exchangeTable: ExchangeTableDto): void {
    exchangeTable.rates.forEach(rate => this.codeToMapWithExchangeRates.set(rate.code, rate.mid))
  }

  getCurrencyExchangeTableDtoFromLastDays(code: string, days: number): Observable<CurrencyExchangeTableDto> {
    return this.getTableForCode(code).pipe(
      switchMap(table => {
        const url = `${this.BASE_URL}/rates/${table}/${code}/last/${days}/`
        return this.http.get<CurrencyExchangeTableDto>(url)
      })
    )
  }

  private getTableForCode(code: string): Observable<string> {
    let table: string | undefined = this.codeToTableMap.get(code)
    if(table) {
      return of(table)
    } else {
      return this.getAllRateDtos().pipe(
        map(() => {
          table = this.codeToTableMap.get(code)
          if(!table) {
            throw new Error(`Table not found for code: ${code}`)
          }
          return table
        })
      )
    }
  }

  getExchangeRateForCode(code: string): Observable<number> {
    let rate: number | undefined = this.codeToMapWithExchangeRates.get(code)
    if(rate) {
      return of(rate)
    } else {
      return this.getAllRateDtos().pipe(
        map(() => {
          rate = this.codeToMapWithExchangeRates.get(code)
          if(!rate) {
            throw new Error(`Exchange rate not found for code: ${code}`)
          }
          return rate
        })
      )
    }
  }

  // getExchangeRateForCode(code: string): Observable<number> {
  //   let rate: number | undefined = this.codeToMapWithExchangeRates.get(code)
  //   if(rate) {
  //     console.log(rate)
  //     return of(rate)
  //   } else {
  //     return this.getAllRateDtos().pipe(
  //       map(() => {
  //         rate = this.codeToMapWithExchangeRates.get(code)
  //         if(!rate) {
  //           throw new Error(`Exchange rate not found for code: ${code}`)
  //         }
  //         return rate
  //       })
  //     )
  //   }
  // }

  getCurrencyExchangeTableDtoForDateRange(
    code: string,
    startDate: string,
    endDate: string
  ): Observable<CurrencyExchangeTableDto> {
    return this.getTableForCode(code).pipe(
      switchMap(table => {
        const url = `${this.BASE_URL}/rates/${table}/${code}/${startDate}/${endDate}`
        return this.http.get<CurrencyExchangeTableDto>(url)
      })
    )
  }
}