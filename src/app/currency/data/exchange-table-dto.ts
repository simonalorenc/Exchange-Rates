import { CurrencyRateDto } from "./currency-exchange-table-dto"

export interface ExchangeTableDto {
  table: string
  no: string
  effectiveDate: string
  rates: RateDto[]
}

export interface RateDto {
  currency: string
  code: string
  mid: number
}