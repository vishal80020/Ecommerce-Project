import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LuvToShopFormService {

	constructor() { }

	//returns an observable of array of number
	getCreditCardMonths(startMonth: number): Observable<number[]> {
		let data: number[] = [];
		// buid an array for Month dropdown list

		//if current year is selected then we need to show month from current month to end
		for(let theMonth= startMonth; theMonth<=12; theMonth++) {
			data.push(theMonth);
		}

		return of(data);  //of is used to convert into Observable type
	}

	getCreditCardYears(): Observable<number[]> {
		let data: number[] = [];
		//build an Year for dropdown


		//start at current year and loop for next 10 years
		const startYear: number = new Date().getFullYear();
		const endYear: number = startYear+10;
		for(let theYear = startYear; theYear <= endYear; theYear++ ){
			data.push(theYear);
		}

		return of(data);
	}
}
