import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogInComponent } from './log-in.component';
import { AuthService } from '../auth.service';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { NavbarRoutingService } from '../routing/navbar-routing.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;
  let fbSpy = jasmine.createSpyObj('FormBuilder', ['group']);
  let userServiceSpy = jasmine.createSpyObj('UserService', ['loginUser']);
  let authServiceSpy = jasmine.createSpyObj('AuthService', ['setToken', 'setLoginMessage', 'setUsername']);
  let navbarRoutingServiceSpy = jasmine.createSpyObj('NavbarRoutingService', ['onClickCurrencies'])

  beforeEach(() => {
    const mockFormGroup = {
      get: jasmine.createSpy().and.callFake((controlName: string) => {
        return { value: '' };
      }),
      reset: jasmine.createSpy(),
      markAllAsTouched: jasmine.createSpy()
    };

    fbSpy.group.and.returnValue(mockFormGroup);
    TestBed.configureTestingModule({
      declarations: [LogInComponent],
      providers: [
        { provide: FormBuilder, useValue: fbSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: NavbarRoutingService, useValue: navbarRoutingServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
