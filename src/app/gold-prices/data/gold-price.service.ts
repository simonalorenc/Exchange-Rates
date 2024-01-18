import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GoldPriceDto } from './gold-price-dto';

@Injectable({
  providedIn: 'root'
})
export class GoldPriceService {
  private BASE_URL: string = 'https://api.nbp.pl/api/cenyzlota'
  private NUMBER_OF_LAST_DAYS: number = 14

  constructor(private http: HttpClient) { }

  getGoldPricesDtoFromLastDays(): Observable<GoldPriceDto[]> {
    const url = `${this.BASE_URL}/last/${this.NUMBER_OF_LAST_DAYS}`
    return this.http.get<GoldPriceDto[]>(url)
  }

  getGoldPricesDtoFromRangeTime(startDate: string, endDate: string): Observable<GoldPriceDto[]> {
    const url = `${this.BASE_URL}/${startDate}/${endDate}`
    return this.http.get<GoldPriceDto[]>(url)
  }
}
