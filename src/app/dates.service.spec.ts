import { TestBed } from '@angular/core/testing';

import { DatesService } from './dates.service';

describe('DatesService', () => {
  let service: DatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct start and end date', () => {
    const numberOfItemsOnPage = 5 
    const startDate = new Date()
    const expectedEndDateString = service.getFormattedDate(startDate)
    startDate.setDate(new Date().getDate() - numberOfItemsOnPage + 1)
    const expectedStartDateString = service.getFormattedDate(startDate)
    
    const result = service.getStartAndEndDate(numberOfItemsOnPage)
    
    expect(result.length).toEqual(2);
    expect(result[0]).toEqual(expectedStartDateString);
    expect(result[1]).toEqual(expectedEndDateString);
  });

  it('should return correct dates range', () => {
    const startDate = new Date(2001, 1, 1)
    const endDate = new Date(2001, 1, 5)
    
    const result = service.getAllFormattedDatesBetweenRange(startDate, endDate)

    expect(result.length).toEqual(5);
  });

  it('should return formatted date', () => {
    const date = new Date(2001, 1, 1)
    
    const result = service.getFormattedDate(date)
    
    expect(result).toEqual('2001-02-01');
  });
});
