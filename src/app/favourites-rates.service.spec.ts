import { TestBed } from '@angular/core/testing';

import { FavouritesRatesService } from './favourites-rates.service';
import { RateWithFlag } from './currency/data/rate-with-flag';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { of } from 'rxjs';

describe('FavouritesRatesService', () => {
  let service: FavouritesRatesService;
  let authServiceSpy = jasmine.createSpyObj('AuthService', ['getToken']);
  let userServiceSpy = jasmine.createSpyObj('UserService', ['addCurrency', 'deleteCurrency', 'getUserCurrencies'])

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: UserService, useValue: userServiceSpy }
      ]
    });
    service = TestBed.inject(FavouritesRatesService);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;

    authServiceSpy.getToken.and.returnValue('mock-jwt-token');
    userServiceSpy.addCurrency.and.returnValue(of(null));
    userServiceSpy.deleteCurrency.and.returnValue(of(null));
    userServiceSpy.getUserCurrencies.and.returnValue(of(['eur', 'cad']));
    service.userFavouritesRates = ['thb'];
    
  });

  it('should add code to favourites', () => {
    const codeToAdd = 'cad';
    service.addToFavourites(codeToAdd);
    expect(authServiceSpy.getToken).toHaveBeenCalled();
    expect(userServiceSpy.addCurrency).toHaveBeenCalledWith(codeToAdd, 'mock-jwt-token');
    userServiceSpy.addCurrency.and.callThrough(); 
  });

  it('should remove code from favourites', () => {
    const codeToRemove = 'thb';
    service.removeFromFavourites(codeToRemove);
    expect(authServiceSpy.getToken).toHaveBeenCalled();
    expect(userServiceSpy.deleteCurrency).toHaveBeenCalledWith(codeToRemove, 'mock-jwt-token');
    userServiceSpy.deleteCurrency.and.callThrough();
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
