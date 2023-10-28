import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FlagsService {
  constructor() {}

  getFlagUrl(countryCode: string): string {
    return `https://flagsapi.com/${countryCode.toUpperCase()}/flat/64.png`;
    //MIT license
    //think which flag api choose
    // return `https://flagcdn.com/w160/${countryCode}.webp`;
  }
}
