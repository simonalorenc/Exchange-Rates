import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { NavbarRoutingService } from '../routing/navbar-routing.service';
import { FavouritesRatesService } from '../favourites-rates.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let fbSpy = jasmine.createSpyObj('FormBuilder', ['group']);
  let userServiceSpy = jasmine.createSpyObj('UserService', ['registerUser']);
  let authServiceSpy = jasmine.createSpyObj('AuthService', ['setToken', 'setRegisterMessage', 'setUsername']);
  let navbarRoutingServiceSpy = jasmine.createSpyObj('NavbarRoutingService', ['onClickCurrencies']);
  let favouritesRatesServiceSpy = jasmine.createSpyObj('FavouritesRatesService', ['initializeFavouritesAfterRegister'])

  beforeEach(() => {
    const mockFormGroup = {
      get: jasmine.createSpy().and.callFake((controlName: string) => {
        return {value: ''};
      }),
      reset: jasmine.createSpy(),
      markAllAsTouched: jasmine.createSpy()
    };
    fbSpy.group.and.returnValue(mockFormGroup);
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [
        { provide: FormBuilder, useValue: fbSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: NavbarRoutingService, useValue: navbarRoutingServiceSpy },
        { provide: FavouritesRatesService, useValue: favouritesRatesServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
