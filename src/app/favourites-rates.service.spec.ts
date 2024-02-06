import { TestBed } from '@angular/core/testing';

import { FavouritesRatesService } from './favourites-rates.service';
import { RateWithFlag } from './currency/data/rate-with-flag';

describe('FavouritesRatesService', () => {
  let service: FavouritesRatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavouritesRatesService);

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify(['eur', 'thb']);
    });

    spyOn(localStorage, 'setItem').and.callThrough();
  });

  it('should add code to favourites', () => {
    const codeToAdd = 'cad';

    service.addToFavourites(codeToAdd);

    const expectedStoredRates = JSON.stringify(['eur', 'thb', codeToAdd]);
    expect(localStorage.getItem).toHaveBeenCalledOnceWith('codes');
    expect(localStorage.setItem).toHaveBeenCalledOnceWith(
      'codes',
      expectedStoredRates
    );
  });

  it('should remove code from favourites', () => {
    const codeToRemove = 'thb';

    service.removeFromFavourites(codeToRemove);

    const expectedStoredRates = JSON.stringify(['eur']);
    expect(localStorage.setItem).toHaveBeenCalledOnceWith(
      'codes',
      expectedStoredRates
    );
  });

  it('should check if code is in favourite and return true', () => {
    const code = 'thb';

    const result = service.checkIfRateIsInFavourites(code);

    expect(result).toBeTrue();
  });

  it('should check if code is in favourite and return false', () => {
    const code = 'pln';

    const result = service.checkIfRateIsInFavourites(code);

    expect(result).toBeFalse();
  });

  it('should check favourites', () => {
    const eurRateWithFlag = new RateWithFlag(
      {
        currency: 'euro',
        code: 'eur',
        mid: 4,
      },
      '',
      false
    );
    const cadRateWithFlag = new RateWithFlag(
      {
        currency: 'polski złoty',
        code: 'pln',
        mid: 2,
      },
      '',
      false
    );
    const ratesWithFlag: RateWithFlag[] = [eurRateWithFlag, cadRateWithFlag];

    service.checkFavourites(ratesWithFlag);

    expect(ratesWithFlag[0].isAddedToFavourite).toBeTrue();
    expect(ratesWithFlag[1].isAddedToFavourite).toBeFalse();
  });
});
