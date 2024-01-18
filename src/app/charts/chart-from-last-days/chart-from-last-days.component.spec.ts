import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartFromLastDaysComponent } from './chart-from-last-days.component';

describe('ChartFromLast30DaysComponent', () => {
  let component: ChartFromLastDaysComponent;
  let fixture: ComponentFixture<ChartFromLastDaysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartFromLastDaysComponent]
    });
    fixture = TestBed.createComponent(ChartFromLastDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
