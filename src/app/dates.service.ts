import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  constructor() { }

  getStartAndEndDate(numberOfItemsOnPage: number): string[] {
    const todayDate = new Date()
    const endDateString = this.getFormattedDate(todayDate)
    const startDate = todayDate
    startDate.setDate(todayDate.getDate() - numberOfItemsOnPage + 1)
    const startDateString = this.getFormattedDate(startDate)
    return [startDateString, endDateString]
  }

  getAllFormattedDatesBetweenRange(startDate: Date, endDate: Date): string[] {
    const allDates: string[] = []
    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      allDates.push(this.getFormattedDate(date));
    }
    return allDates;
  }

  getFormattedDate(date: Date): string {
    const yearString = date.getFullYear().toString()
    const monthString = (date.getMonth() + 1).toString().padStart(2, '0')
    const dayString = date.getDate().toString().padStart(2, '0')
    return yearString + "-" + monthString + "-" + dayString
  }
}