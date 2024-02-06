import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarRoutingService } from '../routing/navbar-routing.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let navbarRoutingServiceSpy = jasmine.createSpyObj('NavbarRoutingService', ['onClickCurrencies', 'onClickCalculator', 'onClickGold']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [NavbarComponent],
      providers: [
        { provide: NavbarRoutingService, useValue: navbarRoutingServiceSpy },
        NoopAnimationsModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
